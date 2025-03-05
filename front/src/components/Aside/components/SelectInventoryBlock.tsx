import React, { useEffect, useState } from 'react';
import { AsideDto } from '../../Enviroment/dtos/Aside';
import { Block } from '../../../enum/Block';
import { InventoryType } from '../../../enum/InventoryType';
import Switch from './Switch';

export default function SelectInventoryBlock({ aside }: { aside: AsideDto }) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlocks, setFilteredBlocks] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [visibleBlocks, setVisibleBlocks] = useState<any[]>([]);

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

  // Função para carregar mais blocos (paginação)
  const loadMoreBlocks = (newBlocks: any[]) => {
    setVisibleBlocks((prevBlocks) => [...prevBlocks, ...newBlocks]);
  };

  // Busca os blocos uma única vez
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch('http://localhost:3000/json');
        const data = await response.json();
        // Filtra os blocos com base na lista de inventoryBlocks
        const filteredData = data.filter((block: any) =>
          inventoryBlocks.some((inventoryBlock) =>
            block.name.toLowerCase().includes(inventoryBlock)
          )
        );
        setBlocks(filteredData);
        setFilteredBlocks(filteredData);
        setVisibleBlocks(filteredData.slice(0, 10));
      } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
      }
    };

    fetchBlocks();
  }, []);

  // Filtragem combinada: se houver searchQuery, ignora o filtro pelo inventário;
  // caso contrário, filtra pelos itens que contenham o currentInventoryType.
  useEffect(() => {
    if (!blocks.length) return;
    if(!aside.currentEnviroment?.inventoryType) return;

    const currentInventoryType = aside.currentEnviroment?.inventoryType?.toLowerCase();
    let foundBlock: any = null;

    const finalFilteredBlocks = blocks.filter((block) => {
      const blockName = block.name.toLowerCase();

      // Se houver busca ativa, filtra apenas por searchQuery
      if (searchQuery) {
        const isSearchMatch = blockName.includes(searchQuery.toLowerCase());
        if (isSearchMatch && !foundBlock) {
          foundBlock = block;
        }
        return isSearchMatch;
      }
      // Se não houver busca, mas houver um currentInventoryType, filtra por ele
      else if (currentInventoryType) {
        const isInventoryMatch = blockName.includes(currentInventoryType);
        if (isInventoryMatch && !foundBlock) {
          foundBlock = block;
        }
        return isInventoryMatch;
      }
      // Se não houver nem busca nem filtro de inventário, exibe todos os blocos
      if (!foundBlock) foundBlock = block;
      return true;
    });

    if (foundBlock) {
      setSelectedBlock(foundBlock);
      // Atualiza o inventário no ambiente com base no nome do bloco encontrado
      const matchingInventoryType = Object.values(InventoryType).find((type) =>
        foundBlock.name.toLowerCase().includes(type.toLowerCase())
      );
      if (matchingInventoryType) {
        aside.setCurrentInventoryType(matchingInventoryType);
      }
    }

    setFilteredBlocks(finalFilteredBlocks);
    setVisibleBlocks(finalFilteredBlocks.slice(0, 10));
  }, [aside.currentEnviroment, searchQuery, blocks, aside]);

  // Seleção manual: atualiza o estado local e o ambiente ao clicar em um bloco
  const handleSelect = (block: Block) => {
    setSelectedBlock(block);
    const matchingInventoryType = Object.values(InventoryType).find((type) =>
      block.name.toLowerCase().includes(type.toLowerCase())
    );
    if (matchingInventoryType) {
      aside.setCurrentInventoryType(matchingInventoryType);
    }
    setIsOpen(false);
  };

  // Paginação: carrega mais itens conforme o scroll atinge o fim da lista
  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const bottom =
      event.currentTarget.scrollHeight ===
      event.currentTarget.scrollTop + event.currentTarget.clientHeight;
    if (bottom && visibleBlocks.length < filteredBlocks.length) {
      loadMoreBlocks(filteredBlocks.slice(visibleBlocks.length, visibleBlocks.length + 10));
    }
  };

  return (
    <div className="flex flex-col">
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
                <span className="text-sm font-semibold text-gray-800">{selectedBlock.name}</span>
              </div>
            ) : (
              <div className="text-center">Tipo De Inventario</div>
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
              <div className="max-h-[250px] overflow-y-auto" onScroll={handleScroll}>
                {filteredBlocks.length > 0 ? (
                  visibleBlocks.map((block, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                      onClick={() => handleSelect(block)}
                    >
                      <img
                        src={block.url}
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
      <br />
      {aside.currentInventoryType === InventoryType.CHEST && <Switch aside={aside} />}
    </div>
  );
}
