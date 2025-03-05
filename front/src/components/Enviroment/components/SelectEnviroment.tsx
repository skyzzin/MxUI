import { ChevronDown, Plus, Minus } from 'lucide-react';
import { useState, MouseEvent, useEffect } from 'react';
import ModalCreateEnvironment from './ModalCreateEnviroment'; // Importe o modal
import yaml from 'js-yaml';
import { CurrentEnviroment } from '../dtos/CurrentEnviroment';
import { EnviromentDto } from '../dtos/Enviroment';

export default function SelectEnviroment({enviroment}:{enviroment:EnviromentDto}) {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('Selecione Um Ambiente');
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar o modal

  const [environments, setEnvironments] = useState<CurrentEnviroment[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3000/guis');
        const data = yaml.load(await res.text()) as CurrentEnviroment[]; // Tipando como array de CurrentEnviroment
        setEnvironments(data);
      } catch (error) {
        console.error('Erro ao buscar o arquivo gui.yml:', error);
      }
    })();
  }, []);




// .name and .obj
  const handleSelectChange = (value: CurrentEnviroment) => {
    const enviromentName = Object.keys(value)[0]
    setSelectedEnvironment(enviromentName);
      
    enviroment.setCurrentEnviroment(value)
    
    setShowSelect(false); 
  };

 

 

  return (
    <div className="w-[500px] relative p-4 flex flex-col mr-auto min-h-[80px] bg-gray-500 rounded-[10px]">
      <div className="flex gap-4 w-full justify-between items-center">
        {/* Ambiente Atual */}
        <div
          className="flex gap-2 items-center hover:opacity-50 cursor-pointer"
          onClick={() => setShowSelect(!showSelect)}
        >
          <span className="text-[#ffffff] text-[16pt]">{selectedEnvironment}</span>
          <ChevronDown color="#ffffff" />
        </div>
        <Plus
          color="#ffffff"
          className="hover:opacity-70 cursor-pointer"
          onClick={() => setShowModal(true)} // Abre o modal ao clicar no Plus
        />
      </div>

      {/* Select de ambientes estilizado */}
      {showSelect && (
        <div className="bg-gray-700 text-white p-4 rounded-[10px] mx-4 mt-2 shadow-lg z-10">
          {/* Campo de busca */}
          <input
            type="text"
            placeholder="Buscar ambiente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-2 rounded-md bg-gray-600 text-white placeholder-gray-400"
          />

          {/* Lista de opções */}
          <div className="max-h-40 overflow-auto">
            {environments.length === 0 ? (
              <div className="text-center text-gray-400">Nenhum ambiente encontrado</div>
            ) : (
              environments.map((env, index) => (
                <div
                  key={index}
                  className="flex justify-between p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleSelectChange(env)}
                >
                  <span>{Object.keys(env)[0]}</span>
                  <Minus
                    color="#ffffff"
                    className="cursor-pointer"
                   
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}

   

      {/* Modal para criar ambiente */}
      {showModal && (
        <ModalCreateEnvironment
          setShowModal={setShowModal}
          setEnvironments={setEnvironments}
          setSelectedEnvironment={setSelectedEnvironment}
          environments={environments}
        />
      )}
    </div>
  );
}
