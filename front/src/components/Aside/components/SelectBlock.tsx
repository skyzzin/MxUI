import React, { useEffect, useState } from 'react';
import { AsideDto } from '../../Enviroment/dtos/Aside';
import { Block } from '../../../enum/Block';

export default function SelectBlock({aside}:{aside:AsideDto}) {
  const [files, setFiles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [visibleFiles, setVisibleFiles] = useState<any[]>([]); // Estado para arquivos visíveis
  const [startIndex, setStartIndex] = useState(0); // Estado para o índice inicial

  // Função para carregar mais arquivos
  const loadMoreFiles = (newFiles: any[]) => {
    setVisibleFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3000/json');
        const data = await response.json();
        setFiles(data); // Armazenar todos os arquivos no estado
        loadMoreFiles(data.slice(0, 10)); // Renderiza as primeiras 10 imagens
      } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredFiles(
        files.filter((file) =>
          file.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setVisibleFiles(filteredFiles.slice(0, 10)); // Exibe as 10 primeiras imagens da busca
    } else {
      setFilteredFiles(files);
      setVisibleFiles(files.slice(0, 10)); // Exibe as 10 primeiras imagens quando não há busca
    }
  }, [searchQuery, files]);

  const handleSelect = (file: Block) => {
    setSelectedFile(file);
    aside.setCurrentPaintBlock(file)
    setIsOpen(false); // Fecha o select após selecionar
  };

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const bottom = event.currentTarget.scrollHeight === event.currentTarget.scrollTop + event.currentTarget.clientHeight;
    if (bottom && visibleFiles.length < filteredFiles.length) {
      // Quando o usuário chega ao final da lista, carrega mais imagens
      const nextIndex = visibleFiles.length;
      loadMoreFiles(filteredFiles.slice(nextIndex, nextIndex + 10)); // Carrega mais 10 imagens
    }
  };

  return (
    <div className="bg-gray-800 min-h-[80px] rounded-xl flex flex-col p-4 gap-4 shadow-lg">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-left bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          {selectedFile ? (
            <div className="flex items-center space-x-2">
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-gray-800">
                {selectedFile.name}
              </span>
            </div>
          ) : (
            'Selecione um Bloco'
          )}
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-xl max-h-[300px] overflow-auto">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full p-3 border-b border-gray-300 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div
              className="max-h-[250px] overflow-y-auto"
              onScroll={handleScroll}
            >
              {filteredFiles.length > 0 ? (
                visibleFiles.map((file, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                    onClick={() => handleSelect(file)}
                  >
                    <img
                      src={`${file.url}`}
                      alt={`Imagem ${index}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-gray-800">{file.name}</span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500">Nenhum arquivo encontrado</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
