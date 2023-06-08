import { FC, ReactNode,useEffect,useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import {entriesApi} from '../../apis';
import cogoToast from 'cogo-toast';
export interface EntriesState{
  isAdding: boolean;
  entries:Entry[];
}
const INITIAL_STATE:EntriesState = {
  isAdding: false,
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
    } catch (error) {
      
    }
  }

  const updateEntry = async({_id, description, status}:Entry)=>{
    
    try {
      const {data} = await entriesApi.put(`/entries/${_id}`,{description, status})
      
      const temp = state.entries.map( entry =>{
        if(entry._id === data._id){
          return data
        }
        return entry
      })

      dispatch({type:'Update Entries', payload:[...temp]})
      cogoToast.success('As alterações foram salvas');

    } catch (error) {
      cogoToast.error('Erro ao salvar as alterações');
    }
  }

  const deleteEntry = async(id:string)=>{
    try {
      await entriesApi.delete(`/entries/${id}`)

      const temp = state.entries.filter( entry => entry._id !== id)
      dispatch({type:'Update Entries', payload:[...temp]})
      cogoToast.success('As tarefa foi excluída');

    } catch (error) {
      cogoToast.error('Erro ao excluir a tarefa');
    }
  }

  useEffect(()=>{
    const getEntries= async () => {
      try {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({type:'Load Entries',payload:data})
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
      deleteEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )}


export default Entriesprovider