
import { useState } from 'react'
import './App.css'

function App() {
  const [texto, setTexto] = useState('')
  const [tarefas, setTarefas] = useState([])
  const [filtro, setFiltro] = useState('todas')

  function adicionarTarefa(evento) {
    evento.preventDefault()

    const textoLimpo = texto.trim()

    if (textoLimpo === '') {
      return
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false
    }

    setTarefas((anteriores) => [...anteriores, novaTarefa])
    setTexto('')
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) => {
        if (tarefa.id === id) {
          return { ...tarefa, concluida: !tarefa.concluida }
        }

        return tarefa
      })
    )
  }

  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    )
  }

  function limparConcluidas() {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => !tarefa.concluida)
    )
  }

  const total = tarefas.length

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length

  const pendentes = total - concluidas

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === 'pendentes') {
      return !tarefa.concluida
    }

    if (filtro === 'concluidas') {
      return tarefa.concluida
    }

    return true
  })

  return (
    <main className="container">
      <h1>Organizador de tarefas</h1>

      <form onSubmit={adicionarTarefa}>
        <label htmlFor="nova-tarefa">Nova tarefa</label>

        <div className="formulario">
          <input
            id="nova-tarefa"
            type="text"
            placeholder="Digite sua tarefa..."
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
          />

          <button type="submit">Adicionar</button>
        </div>
      </form>

      <section className="resumo">
        <p>Total: <strong>{total}</strong></p>
        <p>Concluídas: <strong>{concluidas}</strong></p>
        <p>Pendentes: <strong>{pendentes}</strong></p>
      </section>

      <section className="filtros">
        <button
          type="button"
          className={filtro === 'todas' ? 'ativo' : ''}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>

        <button
          type="button"
          className={filtro === 'pendentes' ? 'ativo' : ''}
          onClick={() => setFiltro('pendentes')}
        >
          Pendentes
        </button>

        <button
          type="button"
          className={filtro === 'concluidas' ? 'ativo' : ''}
          onClick={() => setFiltro('concluidas')}
        >
          Concluídas
        </button>
      </section>

      <ul className="lista">
        {tarefasVisiveis.length === 0 ? (
          <li className="vazia">Nenhuma tarefa para exibir.</li>
        ) : (
          tarefasVisiveis.map((tarefa) => (
            <li key={tarefa.id} className="item">
              <label className="texto-tarefa">
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => alternarConclusao(tarefa.id)}
                />

                <span className={tarefa.concluida ? 'concluida' : ''}>
                  {tarefa.texto}
                </span>
              </label>

              <button
                type="button"
                className="btn-remover"
                onClick={() => removerTarefa(tarefa.id)}
              >
                Remover
              </button>
            </li>
          ))
        )}
      </ul>

      <button
        type="button"
        className="btn-limpar"
        onClick={limparConcluidas}
      >
        Limpar concluídas
      </button>
    </main>
  )
}

export default App
