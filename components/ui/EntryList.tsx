import { FC, useContext, useMemo } from 'react';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import {EntryCard} from './';
import { List, Paper } from '@mui/material';

interface Props{
  status:EntryStatus['status']
}

export const EntryList:FC<Props> = ({status}) => {
  
  const {entries} = useContext(EntriesContext)

  const filterEntries = useMemo( ()=> entries.filter( entry => entry.status === status) , [entries] )

  return (
    <div>
      <Paper sx={{height:'calc(100vh - 190px)', overflow:'auto',backgroundColor:'transparent'}}>
        <List sx={{opacity:'1', padding:'10px'}}>
          {
            filterEntries.map( entry =>(
              <EntryCard key={entry._id} entry={entry}/>
            ))
          }
        </List>
      </Paper>
    </div>
  )
}