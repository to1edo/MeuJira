import { FC, ReactNode,useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry, EntryStatus } from '../../interfaces';

export interface EntriesState{
  isAdding: boolean;
  entries:Entry[];
}
const INITIAL_STATE:EntriesState = {
  isAdding: false,
  entries:[
    { 
      _id: uuidv4(),
      description:'Estudar para a prova de física',
      createdAt:Date.now(),
      status: 'pending'
    },
    { 
      _id: uuidv4(),
      description:'Fazer trabalhos de matemática',
      createdAt:Date.now(),
      status: 'in-progress'
    },
    { 
      _id: uuidv4(),
      description:'Estudar Biología',
      createdAt:Date.now(),
      status: 'finished'
    }
  ]
}


interface Props{
  children: ReactNode
}
const Entriesprovider:FC<Props> = ({children}) => {

  const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE)

  const toggleIsAdding = ()=>{
    dispatch({type: 'toggleIsAdding'})
  }

  const addEntry = (description:string)=>{

    const payload:Entry={
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status:'pending'
    }
    dispatch({type:'Add Entry',payload})
  }

  const changeEntryStatus = (id:string, status:EntryStatus['status'])=>{
    const temp = state.entries.map( entry =>{
      if(entry._id === id){
        entry.status = status
      }
      return entry
    })

    dispatch({type:'Change Entry Status', payload:[...temp]})
  }

  return (
    <EntriesContext.Provider value={{
      ...state,
      toggleIsAdding,
      addEntry,
      changeEntryStatus
    }}>
      {children}
    </EntriesContext.Provider>
  )}


export default Entriesprovider