import BasicButton from '../../Common/BasicButton';
import { useModalActions } from '@/Store/ModalStore';
import { useTodoActions } from '@/Store/TodoStore';
import { TodoSubtaskType, TodoType } from '@/Types/Todo';
import {
  TextField,
  Box,
  Divider,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ButtonGroup,
  ListItemText,
  Button,
} from '@mui/material';
import { useRef, useState } from 'react';

let id = 1;

const TodoModal = () => {
  const [subtasks, setSubtasks] = useState<TodoSubtaskType[]>([]);
  const todoInputRef = useRef<null | HTMLInputElement>(null);
  const { deleteModal } = useModalActions();
  const { addTodo } = useTodoActions();

  const addSubtask = () => {
    if (!todoInputRef.current) return;
    const newSubtask: TodoSubtaskType = {
      id: String(++id),
      title: todoInputRef.current.value,
      completed: false,
    };
    todoInputRef.current.value = '';
    setSubtasks(prev => [...prev, newSubtask]);
  };

  const submitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget)

    const newTodo: TodoType = {
      todoId: String(++id),
      head: formData.get('head') as string,
      content: subtasks,
      isActive: false,
    }
    console.log(newTodo)
    addTodo(newTodo);
    deleteModal('create_Todo');
  }

  return (
    <Box
      component="form"
      onSubmit={submitTodo}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <TextField id="head" name='head' label="제목" variant="standard" />
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <TextField
          inputRef={todoInputRef}
          sx={{ flex: '1 1 auto' }}
          id="todo"
          label="할 일 추가"
          variant="standard"
        />
        <BasicButton sx={{ alignSelf: 'end' }} onClick={addSubtask}>
          {' '}
          추가{' '}
        </BasicButton>
      </Box>
      <Divider textAlign="left" sx={{ padding: '20px 20px 0px 20px', color: 'black' }}>
        <h3>할 일 목록</h3>
      </Divider>
      <List
        dense
        sx={{ width: '100%', maxHeight: '200px', bgcolor: 'background.paper', overflowY: 'scroll' }}
      >
        {subtasks.length === 0 && '😢 아무것도 등록되어 있지않아요...'}
        {subtasks.map(e => {
          return (
            <div key={e.id} style={{ display: 'flex' }}>
              <Checkbox
                color="success"
                edge="end"
                onChange={(event) => {
                  const newSubtask = subtasks.filter((sub) => sub.id !== e.id)
                  const updateSubtask = {...e, completed: event.target.checked}
                  setSubtasks([...newSubtask, updateSubtask])
                }}
                checked={e.completed}
              />
              <ListItem
                key={e.id}
                secondaryAction={
                  <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button color="info"> Edit </Button>
                    <Button color="error"> Delete </Button>
                  </ButtonGroup>
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText
                    id={e.id}
                    primary={`${e.title}`}
                    slotProps={{
                      primary: {
                        noWrap: true, // 줄 바꿈 방지
                        sx: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: 200, // 최대 너비 지정 (필수)
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
      <BasicButton type='submit'> 새 할일 등록 </BasicButton>
    </Box>
  );
};

export default TodoModal;
