import { useState } from 'react'
import { ActionPaint } from './enum/ActionPaintEnum'
import Aside from './components/Aside/Aside'
import Enviroment from './components/Enviroment/Enviroment'
import { EnviromentDto } from './components/Enviroment/dtos/Enviroment'
import { InventoryType } from './enum/InventoryType'
import { Block } from './enum/Block'
import { AsideDto } from './components/Enviroment/dtos/Aside'


function App() {
  const [currentInventoryType,setCurrentInventoryType] = useState<InventoryType>()

  const [currentActionPaint,setCurrentActionPaint] = useState<ActionPaint>()
  const [currentPaintBlock,setCurrentPaintBlock]  = useState<Block>()
  
  const enviroment:EnviromentDto = {
    
    currentPaintBlock,
    currentActionPaint,
    currentInventoryType,
    
    setCurrentPaintBlock
    
  }
  const aside:AsideDto = {
    setCurrentInventoryType,
    setCurrentActionPaint,
    setCurrentPaintBlock

  }


  return (
    <div className='bg-[#141414] w-[100vw] h-[100vh] flex'>
      <Aside aside={aside} />
      <Enviroment enviroment={enviroment} />
    </div>
  )
}

export default App
