import React, { useEffect } from "react";
import Grid from "./components/Grid";
import { EnviromentDto } from "./dtos/Enviroment";
import { ChevronDown, ChevronRight, Minus, Plus } from "lucide-react";
import SelectEnviroment from "./components/SelectEnviroment";

export default function Enviroment({ enviroment }: { enviroment: EnviromentDto }) {


  return (
    <div className="h-screen w-full p-4 flex items-center flex-col">
     <SelectEnviroment enviroment={enviroment} />
     
      {enviroment.currentInventoryType && (
        <Grid enviroment={enviroment} />
      )}
    </div>
  );
}
