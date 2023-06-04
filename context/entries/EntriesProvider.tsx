import { FC, ReactNode,useEffect,useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry, EntryStatus } from '../../interfaces';
import {entriesApi} from '../../apis';

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

  useEffect(()=>{
    const getEntries= async () => {
      try {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({type:'Load Entries',payload:data})
      } catch (error) {
        console.log('something went wrong')
      }
    }
    getEntries()

  },[])

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