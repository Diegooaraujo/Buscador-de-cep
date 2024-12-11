import { useState } from 'react'
import './App.css'
import api from './services/api'

import {FiSearch} from 'react-icons/fi'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  async function handSearch(){
    if(input == ""){
      alert("preencha algum cep")
      return;
    }else{
      try{
        const response = await api.get(`${input}/json/`)
        setCep(response.data)
        setInput("")
      }catch{
        alert("Ops, erro ao buscar")
        setInput("")
      }
    }
  }

  return (
    <>
      <div className='conteiner'>
        <h1 className='title'>Buscador CEP</h1>

        <div className='conteinerInput'>
          <input type="text" placeholder='Digite seu CEP' value={input} onChange={(e)=>setInput(e.target.value)} />
          <button className='buttonSearch' onClick={handSearch}><FiSearch size={25} color='FFF' /></button>
        </div>

        {Object.keys(cep).length > 0 &&(
           <main className='main'>
           <h2>CEP: {cep.cep}</h2>
           <span>Rua: {cep.logradouro} </span>
           <span>complemento: {cep.complemento}</span>
           <span>Bairro: {cep.bairro}</span>
           <span>Localidade: {cep.localidade} - {cep.uf}</span>
           <span>ddd: {cep.ddd}</span>
         </main>
        )}
       
      </div>
      
    </>
  )
}

export default App
