import React from 'react'
import { AsideDto } from '../../Enviroment/dtos/Aside'

export default function SaveButton({ aside }: { aside: AsideDto }) {

  const handlerSave = ()=>{
    console.log(aside.enviroments)
  }
  

  return (
    <div className="flex justify-center">
      <button onClick={handlerSave} className="bg-green-500 w-full cursor-pointer hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline">
        Salvar
      </button>
    </div>
  )
}
