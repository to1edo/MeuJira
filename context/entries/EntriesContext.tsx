import {createContext} from 'react'
import { Entry } from '../../interfaces'

interface ContextProps{
  isAdding:boolean;
  entries:Entry[];
  toggleIsAdding:()=>void;
  addEntry:(description:string)=>void,
  updateEntry:(entry:Entry)=>void
}

export const EntriesContext = createContext({} as ContextProps)