import React, { useEffect } from "react";
import Grid from "./components/Grid";
import { EnviromentDto } from "./dtos/Enviroment";

export default function Enviroment({ enviroment }: { enviroment: EnviromentDto }) {


  return (
    <div className="h-screen w-full p-4 flex justify-center">
     {enviroment.currentInventoryType &&  (
       <Grid enviroment={enviroment} />
     )}
    </div>
  );
}
