import { FC, ReactNode,useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState{
  entries:Entry[]
}
const INITIAL_STATE:EntriesState = {
  entries:[

  ]
}


interface Props{
  children: ReactNode
}
const Entriesprovider:FC<Props> = ({children}) => {

  const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE)

  return (
    <EntriesContext.Provider value={{
      ...state
    }}>
      {children}
    </EntriesContext.Provider>
  )}


export default Entriesprovider