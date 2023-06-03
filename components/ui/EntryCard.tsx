import { FC, DragEvent, useContext } from 'react';
import { Entry } from "../../interfaces"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { UIContext } from '../../context/ui';

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


  return (
    <Card 
      sx={{marginBottom:1}}
      draggable
      onDragStart={onDragStart}
    >
      <CardActionArea  sx={{cursor:'grab'}}>
        <CardContent>
          <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>
        </CardContent>

        <CardActions>
          <Typography sx={{textAlign:'right', width:'100%', fontSize:'0.9rem' , color:'#949494'}}>{new Date(entry.createdAt).toUTCString()}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}