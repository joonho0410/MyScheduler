// components/SubtaskItem.tsx
import { useToggle } from '@/Hooks/useToggle';
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
type SubtaskItemProps = TodoSubtaskType & {handleUpdate: (...args: any[]) => any, handleDelete: (...args: any[]) => any};

const SubtaskItem = ({id, title, completed, todoId, handleDelete, handleUpdate } : SubtaskItemProps): React.JSX.Element => {
  const { value: isUpdate, toggle: toggleUpdate } = useToggle();
  const [saveTitle, setSaveTitle] = useState(title)
  const [subtask, setSubtask] = useState<TodoSubtaskType>({
    id,
    title,
    completed,
    todoId
  })

  const handleEditAndSave = () => {
    toggleUpdate();

    // Save 로직
    if (!isUpdate) setSaveTitle(subtask.title)
    if (isUpdate) handleUpdate(subtask);
  };

  const handleDeleteAndCancel = () => {
    // Cancel Logic
    if (isUpdate) {
      setSubtask((prev) => { return {...prev, title: saveTitle} });
      toggleUpdate();
      return;
    }

    // Delete Logic
    handleDelete(subtask);
  };

  return (
    <Box key={id} sx={containerStyle}>
      <Checkbox
        color="success"
        edge="end"
        onChange={(e) => setSubtask((prev) => { return {...prev, completed: e.target.checked }})}
        checked={subtask.completed}
      />
      <ListItem
        secondaryAction={
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button color="info" onClick={handleEditAndSave}>
              {isUpdate ? 'Save' : 'Edit'}
            </Button>
            <Button color="error" onClick={handleDeleteAndCancel}>
              {isUpdate ? 'Cancel' : 'Delete'}
            </Button>
          </ButtonGroup>
        }
        disablePadding
      >
        <ListItemButton>
          {isUpdate ? <UpdateInput title={subtask.title} setSubtask={setSubtask}/> : <NormalInput title={subtask.title}/>}
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

const UpdateInput = ({ title, setSubtask }: {title: string, setSubtask: any}) => {

  return (
    (
      <TextField
        value={title}
        onChange={e => setSubtask((prev: TodoSubtaskType) => {return {...prev, title: e.target.value}})}
        size="small"
        fullWidth
        sx={{ maxWidth: 200 }}
      />
    )
  )
}

const NormalInput = ({ title } : {title: string}) => {
  return (<ListItemText
    primary={title}
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
  />)
}
export default SubtaskItem;
