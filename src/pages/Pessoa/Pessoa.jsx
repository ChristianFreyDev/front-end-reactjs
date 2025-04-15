import './Pessoa.css'
import api from '../../services/api'
import Trash from '../../assets/trash.svg'
import { useEffect, useState, useRef } from 'react'

function Pessoa() {
  const [pessoas, setPessoas] = useState([])
  const inputName = useRef()
  const inputDataNascimento = useRef()
  const inputEmail = useRef()

  async function getPessoas(){
    const pessoasFromApi = await api.get('/Pessoa/ListarPessoas')    
    setPessoas(pessoasFromApi.data.dados)
  }

  async function newPessoa(){
    await api.post('/Pessoa/CriarPessoa', {
      nome: inputName.current.value,
      dataNascimento: inputDataNascimento.current.value,
      email: inputEmail.current.value
    })  
    getPessoas()
  }  

  async function excluirPessoa(id){
    await api.delete(`/Pessoa/ExcluirPessoa?pessoaId=${id}`)    
    getPessoas()
  }

  //Executa quando se inicia a página/F5
  useEffect(() => {
    getPessoas()
  }, [])

  return (
    <div className='container-pessoa'>
      <form className='form-pessoa'>
        <h1 className='title'>Cadastro de pessoa</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
        <input placeholder='Data de nascimento' name='dataNascimento' type='date' ref={inputDataNascimento}/>
        <input placeholder='E-mail' name='email' type='email' ref={inputEmail}/>
        <button type='button' onClick={newPessoa}>Cadastrar</button>
      </form>

      {pessoas.map(pessoa => (
        <div key={pessoa.id} className='card'>
          <div>
            <p>Nome: <span>{pessoa.nome}</span></p>
            <p>Data de nascimento: <span>{pessoa.dataNascimento}</span></p>
            <p>Email: <span>{pessoa.email}</span></p>
          </div>
          <button onClick={() => excluirPessoa(pessoa.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Pessoa