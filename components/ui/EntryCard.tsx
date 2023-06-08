import { FC, DragEvent, useContext } from 'react';
import { Entry } from "../../interfaces"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import formatTime from '../../utils/dateConvert';

interface Props{
  entry:Entry
}

export const EntryCard:FC<Props> = ({entry}) => {

  const {changeIsDragging, isDragging} = useContext(UIContext)

  const onDragStart = (e:DragEvent<HTMLDivElement>)=>{
    e.dataTransfer.setData('id',entry._id)
    //chage state of dragging
    changeIsDragging()
  }

  const router = useRouter()

  return (
    <Card 
      sx={{marginBottom:1}}
      draggable
      onDragStart={onDragStart}
      onClick={()=> router.push(`/entries/${entry._id}`) }
    >
      <CardActionArea  sx={{cursor:'grab'}}>
        <CardContent sx={{padding:'10px'}}>
          <Typography sx={{whiteSpace:'pre-line', fontSize:'0.8rem'}}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{padding:'0 20px 10px 0'}}>
          <Typography sx={{textAlign:'right', width:'100%', fontSize:'0.8rem' , color:'#949494'}}>{formatTime(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}