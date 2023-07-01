import Tarefa from '../../components/Tarefa'
import { MainContainer, Titulo } from '../../styles'

import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltrada = itens
    if (termo !== undefined) {
      tarefasFiltrada = tarefasFiltrada.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltrada = tarefasFiltrada.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltrada = tarefasFiltrada.filter(
          (item) => item.status === valor
        )
      }

      return tarefasFiltrada
    } else {
      return itens
    }
  }

  const exibeResultadoFiltrage = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? ` e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} Tarefa(s) encontrada(s) como: Todas ${complementacao}`
    } else {
      mensagem = `${quantidade} Tarefa(s) encontrada(s) como: "${`${criterio} = ${valor}"`}${complementacao}`
    }
    return mensagem
  }

  const tarefas = filtraTarefas()

  const mensagem = exibeResultadoFiltrage(tarefas.length)

  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              titulo={t.titulo}
              prioridade={t.prioridade}
              status={t.status}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
