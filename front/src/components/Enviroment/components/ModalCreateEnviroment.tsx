import React, { useState } from 'react';
import { CurrentEnviroment } from '../dtos/CurrentEnviroment';

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEnvironments: React.Dispatch<React.SetStateAction<CurrentEnviroment[]>>;
  environments: CurrentEnviroment[];
  setSelectedEnvironment: React.Dispatch<React.SetStateAction<string>>;
}

const ModalCreateEnvironment: React.FC<ModalProps> = ({
  setShowModal,
  setEnvironments,
  setSelectedEnvironment,
  environments,
}) => {
  const [newEnvironmentName, setNewEnvironmentName] = useState<string>('');

  // Função para verificar se o ambiente já existe
  const isEnvironmentExist = (name: string) => {
    return environments.some((envObj) => envObj.inventoryType === name);
  };

  // Função para criar o novo ambiente
  const handleCreateEnvironment = () => {
    const trimmedName = newEnvironmentName.trim();

    // Verifica se o nome do ambiente não está vazio
    if (!trimmedName) {
      return;
    }

    // Verifica se o ambiente já existe
    if (isEnvironmentExist(trimmedName)) {
      alert('Ambiente já existe!');
      return;
    }

    // Adiciona o novo ambiente
    setEnvironments((prevEnvironments) => [
      ...prevEnvironments,
      { inventoryType: trimmedName, enviroment: [] },
    ]);

    // Define o ambiente recém-criado como o selecionado
    setSelectedEnvironment(trimmedName);
    setNewEnvironmentName(''); // Limpa o campo de entrada
    setShowModal(false); // Fecha o modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-gray-800 p-6 rounded-[10px] w-[300px]">
        <h2 className="text-white text-lg mb-4">Criar Novo Ambiente</h2>
        <input
          type="text"
          value={newEnvironmentName}
          onChange={(e) => setNewEnvironmentName(e.target.value)}
          placeholder="Nome do ambiente"
          className="w-full p-2 mb-4 rounded-md bg-gray-600 text-white placeholder-gray-400"
        />
        <div className="flex justify-between">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Fechar
          </button>
          <button
            onClick={handleCreateEnvironment}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateEnvironment;
