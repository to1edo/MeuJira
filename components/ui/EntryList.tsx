import { FC, useContext, useMemo, DragEvent, useState } from 'react';
import { EntryStatus } from "../../interfaces";
import { EntriesContext } from "../../context/entries";
import { EntryCard } from "./";
import { List, Paper } from "@mui/material";
import { UIContext } from "../../context/ui";

interface Props {
  status: EntryStatus["status"];
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, changeEntryStatus } = useContext(EntriesContext);
  const { changeIsDragging, isDragging } = useContext(UIContext);

  const [dragginOver,setDragginOver] = useState(false)

  const filterEntries = useMemo(() => entries.filter((entry) => entry.status === status), [entries]);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("id");

    changeEntryStatus(id, status);
    changeIsDragging();
    setDragginOver(false)
  };

  const onDragOver = (e:DragEvent<HTMLDivElement>)=>{
    e.preventDefault()
  }

  return (
    <div
      style={{ width: "100%", display: "flex" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={(e)=> setDragginOver(true) }
      onDragLeave={()=> setDragginOver(false) }
    >
      <Paper
        sx={{backgroundColor: dragginOver?'#ff910057':"transparent", overflow: "auto", width: "100%" }}
        onDragEnter={(e)=> setDragginOver(true) }
      >
        <List
          sx={{
            opacity: isDragging ? "0.2" : "1",
            padding: "10px",
            transition: "all 0.3s",
            pointerEvents:dragginOver?'none':''
          }}
          
        >
            {filterEntries.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
        </List>
      </Paper>
    </div>
  );
};
