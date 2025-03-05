import React, { useEffect, useState } from 'react';
import SelectBlock from './components/SelectBlock';
import SelectInventoryBlock from './components/SelectInventoryBlock';
import SelectTool from './components/SelectTool';
import { AsideDto } from '../Enviroment/dtos/Aside';

export default function Aside({aside}:{aside:AsideDto}) {
  
  
  return (
    <div className="border-gray-300 min-w-[300px] border-r p-4">
      <div className="text-[#ffffff] px-4 py-2">Tipo De Inventario</div>
      <SelectInventoryBlock aside={aside} />
     
      <div className="text-[#ffffff] px-4 py-2">Selecione o Bloco</div>

      <SelectBlock aside={aside} />
     
      <div className="text-[#ffffff] px-4 py-2">Ferramenta De Seleção</div>

      <SelectTool aside={aside} />
    </div>
  );
}
