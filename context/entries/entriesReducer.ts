import { EntriesState } from "./"

type EntriesActionType =
{ type:'actionType' }

export const entriesReducer = (state: EntriesState, action: EntriesActionType)=>{

  switch (action.type) {
    case 'actionType':
      return{
        ...state
      }

    default:
      return state
  }
}