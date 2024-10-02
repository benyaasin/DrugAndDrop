import { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
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
  const [editInput, setEditInput] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
 

  const addListItem = () => {

    if (listInput.trim().length > 0) {
      const listItemId = nanoid()
      const newList = {
        id: listItemId,
        content: listInput
      }
      setlistItems([...listItems, newList])
      setListInput("")

    } else {
      Swal.fire({
        icon: "error",
        title: "Uyyy...",
        text: "Bir şeyler yanlış gitti!",

      });
    }

  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrag = (result: any) => {
    if (!result.destination) return;
    const items = [...listItems]
    const [removedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, removedItem)
    setlistItems(items)
  }

  const handleDelete = (id: string) => {
    const newList = listItems.filter((item) => item.id !== id)
    setlistItems(newList)
  }
  const handleEdit = (id: string) => {
    const selectedItem = listItems.find((item) => item.id === id)
    if (selectedItem) {
      const newList = listItems.map((item) => item.id === id ? {...item, content: editInput} : item)
      setlistItems(newList)
      setOpen(false)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = (id: string, content: string) => {
    setSelectedId(id)
    setEditInput(content)
    setOpen(true)
  }

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
          margin: "1rem",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.24)"

        }}>
        <Box sx={{
          flexDirection: "column",
          textAlign: "center",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.12)",
          padding: "1rem",

        }}>
          <h2>List</h2>
          <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId='dragDropList'>
              {(provided) => (
                <div ref={provided.innerRef}{...provided.droppableProps}>
                  {listItems.map(
                    ({ id, content }: ListItemProps, index: number) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1rem",
                              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.12)",
                              borderRadius: "1rem",
                              gap: "2rem",
                            }}
                          >
                            {content}
                            <Box sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "0.8rem",
                            }}>
                              <Button variant='contained' color='info' onClick={() => handleOpen(id, content)}>Düzenle</Button>
                              <Button variant='contained' color='error' onClick={() => handleDelete(id)}>Sil</Button>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                </div>
              )}

            </Droppable>
          </DragDropContext>
        </Box>

      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400, minHeight: 40, bgcolor: 'white', padding: "1rem",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
            borderRadius: "1rem",
        }}>
          <TextField
            
            label="Düzenle"
            color='primary'
            type='text'
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <Button variant='contained' color='info' onClick={() => handleEdit(selectedId)}>OK</Button>
          <Button variant='contained' color='error' onClick={handleClose}>Kapat</Button>
        </Box>
      </Modal>
    </>
  )
}

export default App
