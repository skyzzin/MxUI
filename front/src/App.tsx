import { useState } from 'react'
import { ActionPaint } from './enum/ActionPaintEnum'
import Aside from './components/Aside/Aside'
import Enviroment from './components/Enviroment/Enviroment'
import { EnviromentDto } from './components/Enviroment/dtos/Enviroment'
import { InventoryType } from './enum/InventoryType'
import { Block } from './enum/Block'
import { AsideDto } from './components/Enviroment/dtos/Aside'
import { CurrentEnviroment } from './components/Enviroment/dtos/CurrentEnviroment'


function App() {
  const [isDoubleChest,setIsDoubleChest] = useState<boolean>(false)
  const [currentInventoryType,setCurrentInventoryType] = useState<InventoryType>()
  const [currentActionPaint,setCurrentActionPaint] = useState<ActionPaint>()
  const [currentPaintBlock,setCurrentPaintBlock]  = useState<Block>()

  const [currentEnviroment,setCurrentEnviroment] = useState<CurrentEnviroment>()
  
  const enviroment:EnviromentDto = {
    
    currentPaintBlock,
    currentActionPaint,
    currentInventoryType,
    isDoubleChest,
    currentEnviroment,
    
    setCurrentPaintBlock,
    setCurrentEnviroment
    
  }
  const aside:AsideDto = {
    setCurrentInventoryType,
    setCurrentActionPaint,
    setCurrentPaintBlock,
    setIsDoubleChest,
  

    currentInventoryType,
    currentEnviroment
    

  }


  return (
    <div className='bg-[#141414] w-[100vw] h-[100vh] flex'>
      <Aside aside={aside} />
      <Enviroment enviroment={enviroment} />
    </div>
  )
}

export default App
