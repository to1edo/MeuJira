import { useState, ChangeEvent, FC, useContext } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { isValidObjectId } from "mongoose";
import { entriesApi } from "../../apis";
import { EntriesContext } from "../../context/entries";
import formatTime from "../../utils/dateConvert";
import { toast } from "react-toastify";
interface Props{
  entry:Entry | null;
}
const Entries:FC<Props> = ({entry}) => {

  const {updateEntry, deleteEntry} = useContext(EntriesContext)
  const router = useRouter();

  const [inputValue, setInputValue] = useState(entry?.description || '');
  const [status, setStatus] = useState<EntryStatus['status']>(entry?.status || 'pending')
  const [touched, setTouched] = useState(false)


  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value)
  }

  const onStatusChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setStatus(e.target.value as EntryStatus['status'])
  }

  const onSave = ()=>{
    if(inputValue.trim().length === 0 ) return

    updateEntry({
      ...entry!,
      description: inputValue,
      status
    })
    toast.success('As alterações foram salvas');
    setTouched(false)
  }

  const onDelete = ()=>{
    if(confirm('¿Deseja deletar esta tarefa?')){
      deleteEntry(entry?._id!)

      setTimeout(()=>{
        router.replace('/')
      },2000)
    }  
  }

  return (
    <Layout title={entry?.description? entry?.description.substring(0,25)+'...' : 'Não encontrado'}>
      {
        entry === null?
        (
          <Typography variant="h6" sx={{textAlign:'center', marginTop:2}}>A tarefa que você está tentando visitar não existe</Typography>
        ):
        (
          <>
            <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={8} md={6}>
                <Card>
                  <CardHeader title={'Tarefa:'} subheader={formatTime(entry?.createdAt)} />

                  <CardContent sx={{ paddingTop: 0 }}>
                    <TextField
                      sx={{ mt: 2, mb: 1 }}
                      fullWidth
                      label="Conteúdo da tarefa"
                      placeholder="Conteúdo"
                      autoFocus
                      multiline
                      onChange={handleChange}
                      onBlur={()=> setTouched(true)}
                      value={inputValue}
                      error={inputValue.trim().length<=0 && touched}
                      helperText={inputValue.trim().length<=0 && touched && 'Insira um valor'}
                    />

                    <FormControl sx={{ marginTop: 2 }}>
                      <FormLabel>Estado</FormLabel>
                      <RadioGroup
                        row
                        value={status}
                        onChange={onStatusChange}
                      >
                        <FormControlLabel
                          value="pending"
                          control={<Radio />}
                          label="Pendente"
                        />
                        <FormControlLabel
                          value="in-progress"
                          control={<Radio />}
                          label="Em progresso"
                        />
                        <FormControlLabel
                          value="finished"
                          control={<Radio />}
                          label="Completado"
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardContent>

                  <CardActions>
                    <Button
                      startIcon={<SaveOutlinedIcon />}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled={inputValue.trim().length<=0}
                      onClick={onSave}
                    >
                      Salvar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>

            <IconButton
              sx={{
                position: "fixed",
                bottom: 30,
                right: 30,
                backgroundColor: "error.main",
              }}
              onClick={onDelete}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </>
        )
      }

    </Layout>
  );
};

export default Entries;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {id} = ctx.params as {id:string}
  
  if(!isValidObjectId(id)){
    return {
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  let entry
  await entriesApi.get('/entries/'+id)
  .then(res=>{
    entry = res.data
  })
  .catch(err=>{
    entry=null
  })

  return {
    props:{
      entry
    }
  }
  
}
