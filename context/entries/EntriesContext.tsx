import {createContext} from 'react'
import { Entry, EntryStatus } from '../../interfaces'

interface ContextProps{
  isAdding:boolean;
  entries:Entry[];
  toggleIsAdding:()=>void;
  addEntry:(description:string)=>void,
  changeEntryStatus:(id:string, status:EntryStatus['status'])=>void
}

export const EntriesContext = createContext({} as ContextProps)