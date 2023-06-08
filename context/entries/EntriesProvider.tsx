import { FC, ReactNode,useContext,useEffect,useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import {entriesApi} from '../../apis';
import {toast} from 'react-toastify';
import { UIContext } from '../ui';
export interface EntriesState{
  isAdding: boolean;
  isFetching:boolean;
  entries:Entry[];
}
const INITIAL_STATE:EntriesState = {
  isAdding: false,
  isFetching: false,
  entries:[]
}


interface Props{
  children: ReactNode
}
const Entriesprovider:FC<Props> = ({children}) => {

  const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE)

  const toggleIsAdding = ()=>{
    dispatch({type: 'toggleIsAdding'})
  }

  const addEntry = async(description:string)=>{

    try {
      const {data} = await entriesApi.post<Entry>('/entries',{description})
      dispatch({type:'Add Entry',payload:data})
      toast.success('Criado com sucesso')
    } catch (error) {
      toast.error('Erro ao salvar a tarefa');
    }
  }

  const updateEntry = async({_id, description, status}:Entry)=>{
    
    const temp = state.entries.map( entry =>{
      if(entry._id === _id){
        return {
          ...entry,
          description,
          status
        }
      }
      return entry
    })
    dispatch({type:'Update Entries', payload:[...temp]})

    try {
      await entriesApi.put(`/entries/${_id}`,{description, status})
      
    } catch (error) {
      toast.error('Erro ao salvar as alterações');
    }
  }

  const deleteEntry = async(id:string)=>{
    try {
      await entriesApi.delete(`/entries/${id}`)

      const temp = state.entries.filter( entry => entry._id !== id)
      dispatch({type:'Update Entries', payload:[...temp]})
      toast.success('As tarefa foi excluída',{autoClose:1000});

    } catch (error) {
      toast.error('Erro ao excluir a tarefa',{autoClose:1000});
    }
  }

  const toogleIsFetching = () => dispatch({ type: 'Toggle isFetching' })

  useEffect(()=>{
    const getEntries= async () => {
      toogleIsFetching()
      try {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({type:'Load Entries',payload:data})
        toogleIsFetching()
      } catch (error) {
        
      }
  
    }
    getEntries()

  },[])

  return (
    <EntriesContext.Provider value={{
      ...state,
      toggleIsAdding,
      addEntry,
      updateEntry,
      deleteEntry,
      toogleIsFetching
    }}>
      {children}
    </EntriesContext.Provider>
  )}


export default Entriesprovider