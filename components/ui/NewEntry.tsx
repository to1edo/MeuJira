import { useContext, useState, ChangeEvent} from 'react';
import { EntriesContext } from '../../context/entries';

import { Button, Box, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

export const NewEntry = () => {

  const {isAdding, toggleIsAdding, addEntry} = useContext(EntriesContext)

  const [touched, setTouched] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value)
  }

  const handleCancel = ()=>{
    setTouched(false)
    toggleIsAdding()
  }

  const onSave = ()=>{
    if(inputValue.trim().length === 0 ) return
    
    addEntry(inputValue)
    setInputValue('')
    setTouched(false)
    toggleIsAdding()
  }

  return (

    <Box sx={{}}>
      {
        isAdding ?
        (
          <Box sx={{padding:'0 16px'}}>
            <TextField 
              sx={{marginBottom:'16px'}}
              fullWidth
              placeholder='Nova tarefa'
              autoFocus
              multiline
              label='Nova tarefa'
              value={inputValue}
              error={inputValue.trim().length<=0 && touched}
              onBlur={()=> setTouched(true)}
              onChange={handleChange}
              helperText={inputValue.trim().length<=0 && touched && 'Insira um valor'}
            />


            <Box  display='flex' justifyContent='space-between'>
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleCancel}
              >
                Cancelar
              </Button>

              <Button
                variant='outlined'
                color='primary'
                endIcon={<SaveOutlinedIcon/>}
                onClick={onSave}
              >
                Salvar
              </Button>

            </Box>
          </Box>
        ):
        (
          <Button
            variant='contained'
            color='primary'
            endIcon={<AddBoxOutlinedIcon/>}
            sx={{margin:'0 16px'}}
            onClick={toggleIsAdding}
          >
            Adicionar tarefa
          </Button>
        )
      }
    </Box>
  )
}