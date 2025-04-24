// components/SubtaskItem.tsx
import { useToggle } from '@/Hooks/useToggle';
import { useTodoActions } from '@/Store/TodoStore';
import { TodoSubtaskType } from '@/Types/Todo';
import {
  Checkbox,
  ButtonGroup,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  border: '1px solid #ccc',
  borderRadius: 2,
  backgroundColor: '#f9f9f9',
};

const SubtaskItem = (subtask: TodoSubtaskType): React.JSX.Element => {
  const { addTodo } = useTodoActions()
  const {value: isUpdate, toggle: toggleUpdate} = useToggle();
  const [title, setTitle] = useState(subtask.title)

  const handleEditAndSave = () => {
    toggleUpdate();
    
    // Save 로직
    if (isUpdate)  {

      return ;
    }
  }

  const handleDeleteAndCancel = () => {
    // Cancel Logic
    if (isUpdate) {
      setTitle(subtask.title)
      toggleUpdate();
      return ;
    }

    // Delete Logic
  }

  return (
    <Box key={subtask.id} sx={containerStyle}>
      <Checkbox
        color="success"
        edge="end"
        onChange={() => console.log()}
        checked={subtask.completed}
      />
      <ListItem
        secondaryAction={
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button color="info" onClick={handleEditAndSave}>
              { isUpdate ? 'Save' : 'Edit' }   
            </Button>
            <Button color="error" onClick={handleDeleteAndCancel}>
              { isUpdate ? 'Cancel' : 'Delete' }
            </Button>
          </ButtonGroup>
        }
        disablePadding
      >
        <ListItemButton>
        {isUpdate ? (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
              fullWidth
              sx={{ maxWidth: 200 }}
            />
          ) 
          :
          <ListItemText
            primary={subtask.title}
            slotProps={{
              primary: {
                noWrap: true,
                sx: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 200,
                },
              },
            }}
          />
}
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default SubtaskItem;
