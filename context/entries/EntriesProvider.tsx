import { FC, ReactNode,useEffect,useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
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

      dispatch({type:'Update Entry', payload:[...temp]})
      
    } catch (error) {
      console.log('something went wrong')
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
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )}


export default Entriesprovider