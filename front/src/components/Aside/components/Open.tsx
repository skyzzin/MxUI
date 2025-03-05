import React, { useRef } from 'react'
import { AsideDto } from '../../Enviroment/dtos/Aside'

export default function OpenButton({ aside }: { aside: AsideDto }) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.yml')) {
      alert("Selecione um arquivo com extensão .yml")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch('http://localhost:3000/create/file', {
        method: 'POST',
        body: formData,
      })

      console.log(file)

      if (response.ok) {
        aside.setFileYamlIsPresent(true)
      } else {
        aside.setFileYamlIsPresent(false)

        alert("Falha ao enviar o arquivo")
      }
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error)
      alert("Erro ao enviar o arquivo")
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 w-full cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline"
      >
        Abrir
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".yml"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
