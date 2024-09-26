
import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


interface ListItemProps {
  id: string;
  content: string;
}


function App() {
  const [listInput, setListInput] = useState<string>("");
  const [listItems, setlistItems] = useState<ListItemProps[]>([]);
  const addListItem = () => {

    if (listInput.trim().length > 0) {
      const listItemId = nanoid()
      const newList = {
        id: listItemId,
        content: listInput
      }
      setlistItems([...listItems, newList])

    } else {
      Swal.fire({
        icon: "error",
        title: "Uyyy...",
        text: "Bir şeyler yanlış gitti!",

      });
    }

  }
  const handleDrag = () => { }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "0.8rem",

        }}
      >
        <TextField
          label="Todo"
          color='primary'
          type='text'
          value={listInput}
          onChange={(e) => setListInput(e.target.value)}
          sx={{
            backgroundColor: 'lightgrey',
          }}
        />
        <Button variant='contained' color='info' onClick={addListItem}>
          Ekle
        </Button>

      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "0.8rem",
        }}>
        <Box sx={{
          flexDirection: "column",
          textAlign: "center"
        }}>
          <h2>List</h2>
          <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId='dragDropList'>
              {(provided) => (
                <div ref={provided.innerRef}{...provided.droppableProps}>
                  {listItems.map(
                    ({ id, content }: ListItemProps, index: number) => (
                  <Draggable key={id} draggableId={id} index={index}>

                  </Draggable>
                  ))}
                </div>
              )}

            </Droppable>
          </DragDropContext>
        </Box>

      </Box>
    </>
  )
}

export default App
