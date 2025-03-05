import { useEffect, useState } from 'react'
import { ActionPaint } from './enum/ActionPaintEnum'
import Aside from './components/Aside/Aside'
import Enviroment from './components/Enviroment/Enviroment'
import { EnviromentDto } from './components/Enviroment/dtos/Enviroment'
import { InventoryType } from './enum/InventoryType'
import { Block } from './enum/Block'
import { AsideDto } from './components/Enviroment/dtos/Aside'
import { CurrentEnviroment } from './components/Enviroment/dtos/CurrentEnviroment'


function App() {
  const [fileYamlIsPresent,setFileYamlIsPresent] = useState<boolean>(false)

  const [isDoubleChest,setIsDoubleChest] = useState<boolean>(false)
  const [currentInventoryType,setCurrentInventoryType] = useState<InventoryType>()
  const [currentActionPaint,setCurrentActionPaint] = useState<ActionPaint>()
  const [currentPaintBlock,setCurrentPaintBlock]  = useState<Block>()

  const [currentEnviroment,setCurrentEnviroment] = useState<CurrentEnviroment>()
  const [enviroments,setEnviroments] = useState<CurrentEnviroment[]>()

  
  const enviroment:EnviromentDto = {
    
    currentPaintBlock,
    currentActionPaint,
    currentInventoryType,
    isDoubleChest,
    currentEnviroment,
    enviroments,
    setCurrentPaintBlock,
    setCurrentEnviroment,
    setEnviroments
    
  }
  const aside:AsideDto = {
    setCurrentInventoryType,
    setCurrentActionPaint,
    setCurrentPaintBlock,
    setIsDoubleChest,
    setFileYamlIsPresent,

    currentInventoryType,
    currentEnviroment,
    fileYamlIsPresent,
    enviroments
    
    

  }

  useEffect(()=>{
     (async () => {
          try {
            const res = await fetch('http://localhost:3000/guis');
            if(res.status != 404){
             setFileYamlIsPresent(true)
            }
           
          } catch (error) {
            alert('Erro ao buscar o arquivo gui.yml');
          }
        })();
  },[])


  return (
    <div className='bg-[#141414] w-[100vw] h-[100vh] flex'>
      <Aside aside={aside} />
      {fileYamlIsPresent && (
        <Enviroment enviroment={enviroment} />
      )}
    </div>
  )
}

export default App
