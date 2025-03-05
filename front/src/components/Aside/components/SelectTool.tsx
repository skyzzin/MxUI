import React, { useState } from 'react';
import { MousePointer, Eraser, PenTool } from 'lucide-react';
import { AsideDto } from '../../Enviroment/dtos/Aside';
import { ActionPaint } from '../../../enum/ActionPaintEnum';

export default function SelectTool(aside:{
  [x: string]: any;aside:AsideDto
}) {
  // Declarar o estado diretamente dentro do componente
  const [selectedTool, setSelectedTool] = useState<ActionPaint | null>(null);

  const select = (tool: ActionPaint) => {
    // Atualiza o estado para a ferramenta selecionada
    setSelectedTool(tool);
    aside.setCurrentActionPaint(tool)
  };

  return (
    <div className="flex gap-8 justify-center p-2">
      {/* Botão de Ferramenta de Seleção */}
    {/*   <div className="relative group">
        <button
          onClick={() => select(ActionPaint.SELECT)}
          className={`p-3 rounded-lg shadow-md transition ${
            selectedTool === ActionPaint.SELECT ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-400`}
        >
          <MousePointer size={24} />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          Ferramenta de Seleção
        </div>
      </div> */}

      {/* Botão de Apagador */}
      <div className="relative group">
        <button
          onClick={() => select(ActionPaint.ERASER)}
          className={`p-3 rounded-lg shadow-md transition ${
            selectedTool === ActionPaint.ERASER ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-red-400`}
        >
          <Eraser size={24} />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          Apagador
        </div>
      </div>

      {/* Botão de Desenho */}
      <div className="relative group">
        <button
          onClick={() => select(ActionPaint.PEN)}
          className={`p-3 rounded-lg shadow-md transition ${
            selectedTool === ActionPaint.PEN ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-green-400`}
        >
          <PenTool size={24} />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          Desenho
        </div>
      </div>
    </div>
  );
}

