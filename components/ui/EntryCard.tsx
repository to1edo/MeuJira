import { FC } from "react"
import { Entry } from "../../interfaces"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

interface Props{
  entry:Entry
}

export const EntryCard:FC<Props> = ({entry}) => {
  return (
    <Card sx={{marginBottom:1}}>
      <CardActionArea>
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