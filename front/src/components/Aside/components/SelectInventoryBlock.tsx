import React, { useEffect, useState } from 'react';
import { AsideDto } from '../../Enviroment/dtos/Aside';
import { Block } from '../../../enum/Block';
import { InventoryType } from '../../../enum/InventoryType';

export default function SelectInventoryBlock({aside}:{aside:AsideDto}) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlocks, setFilteredBlocks] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [visibleBlocks, setVisibleBlocks] = useState<any[]>([]); // Estado para blocos visíveis
  const [startIndex, setStartIndex] = useState(0); // Estado para o índice inicial

  // Lista de blocos com inventário (usando nomes parciais)
  const inventoryBlocks = [
    'chest',
    'ender_chest',
    'shulker_box',
    'barrel',
    'furnace',
    'blast_furnace',
    'smoker',
    'crafting_table',
    'anvil',
    'enchantment_table',
    'hopper',
  ];

  // Função para carregar mais blocos
  const loadMoreBlocks = (newBlocks: any[]) => {
    setVisibleBlocks((prevBlocks) => [...prevBlocks, ...newBlocks]);
  };

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch('http://localhost:3000/json');
        const data = await response.json();
        const filteredData = data.filter((block: any) =>
          inventoryBlocks.some((inventoryBlock) =>
            block.name.toLowerCase().includes(inventoryBlock)
          )
        );
        setBlocks(filteredData); // Armazenar blocos com inventário
        loadMoreBlocks(filteredData.slice(0, 10)); // Renderiza os primeiros 10 blocos
      } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
      }
    };

    fetchBlocks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredBlocks(
        blocks.filter((block) =>
          block.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setVisibleBlocks(filteredBlocks.slice(0, 10)); // Exibe os 10 primeiros blocos da busca
    } else {
      setFilteredBlocks(blocks);
      setVisibleBlocks(blocks.slice(0, 10)); // Exibe os 10 primeiros blocos quando não há busca
    }
  }, [searchQuery, blocks]);

  const handleSelect = (block: Block) => {
    setSelectedBlock(block);
    const isValidInventoryType = Object.values(InventoryType).some(type =>
      block.name.includes(type.toLowerCase()) // Verifica se algum enum está contido no nome do bloco
  );
  
  if (isValidInventoryType) {
      const filter = Object.values(InventoryType).find(type => block.name.includes(type.toLowerCase())) as InventoryType;
      console.log(filter);
      aside.setCurrentInventoryType(filter)

  }
  

    setIsOpen(false); // Fecha o select após selecionar
  };

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const bottom = event.currentTarget.scrollHeight === event.currentTarget.scrollTop + event.currentTarget.clientHeight;
    if (bottom && visibleBlocks.length < filteredBlocks.length) {
      const nextIndex = visibleBlocks.length;
      loadMoreBlocks(filteredBlocks.slice(nextIndex, nextIndex + 10)); // Carrega mais 10 blocos
    }
  };

  return (
    <div className="bg-gray-800 min-h-[80px] rounded-xl flex flex-col p-4 gap-4 shadow-lg">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-left bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          {selectedBlock ? (
            <div className="flex items-center space-x-2">
              <img
                src={selectedBlock.url}
                alt={selectedBlock.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-gray-800">
                {selectedBlock.name}
              </span>
            </div>
          ) : (
            <div className='text-center'>
              Tipo De Inventario
            </div>
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
              {filteredBlocks.length > 0 ? (
                visibleBlocks.map((block, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                    onClick={() => handleSelect(block)}
                  >
                    <img
                      src={`${block.url}`}
                      alt={`Imagem ${index}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-gray-800">{block.name}</span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500">Nenhum bloco encontrado</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
