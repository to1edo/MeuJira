import { EntriesState } from "./"
import { Entry } from '../../interfaces';

type EntriesActionType =
{ type:'toggleIsAdding' }|
{ type:'Add Entry', payload:Entry}|
{ type:'Load Entries', payload:Entry[]}|
{ type:'Update Entries', payload:Entry[]}|
{ type:'Delete Entry', payload:Entry[]} |
{ type: "Toggle isFetching" }

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

    case 'Update Entries':
      return{
        ...state,
        entries: action.payload
      }

    case 'Load Entries':
      return{
        ...state,
        entries: action.payload
      }

      case "Toggle isFetching":
        return {
          ...state,
          isFetching: !state.isFetching,
        }

    default:
      return state
  }
}