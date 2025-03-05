import React, { useEffect, useState } from 'react';
import SelectBlock from './components/SelectBlock';
import SelectInventoryBlock from './components/SelectInventoryBlock';
import SelectTool from './components/SelectTool';
import { AsideDto } from '../Enviroment/dtos/Aside';
import SaveButton from './components/Save';
import OpenButton from './components/Open';

export default function Aside({ aside }: { aside: AsideDto }) {


  return (
    <div className="border-gray-300 min-w-[300px] border-r p-4">
      {aside.fileYamlIsPresent && (
        <div className="">
          <div className="text-[#ffffff] px-4 py-2">Tipo De Inventario</div>

          <SelectInventoryBlock aside={aside} />

          <div className="text-[#ffffff] px-4 py-2">Selecione o Bloco</div>

          <SelectBlock aside={aside} />

          <div className="text-[#ffffff] px-4 py-2">Ferramenta De Seleção</div>

          <SelectTool aside={aside} />
        </div>
      )}

      <div className=" mt-12">
        <OpenButton aside={aside} />
      </div>

      {aside.fileYamlIsPresent && (
        <div className=" mt-12">
          <SaveButton aside={aside} />
        </div>
      )}


    </div>
  );
}
