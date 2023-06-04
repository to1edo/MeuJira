import { EntriesState } from "./"
import { Entry } from '../../interfaces';

type EntriesActionType =
{ type:'toggleIsAdding' }|
{ type:'Add Entry', payload:Entry}|
{ type:'Load Entries', payload:Entry[]}|
{ type:'Update Entry', payload:Entry[]}

export const entriesReducer = (state: EntriesState, action: EntriesActionType)=>{

  switch (action.type) {
    case 'toggleIsAdding':
      return{
        ...state,
        isAdding: !state.isAdding,
      }

    case 'Add Entry':
    return{
      ...state,
      entries: [...state.entries,action.payload]
    }

    case 'Update Entry':
      return{
        ...state,
        entries: action.payload
      }

    case 'Load Entries':
      return{
        ...state,
        entries: action.payload
      }

    default:
      return state
  }
}