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
import ListBox from '../../Common/ListBox';
import SubtaskItem from '../../ListCard/ListSubtaskItem';

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

    const formData = new FormData(e.currentTarget);

    const newTodo: TodoType = {
      todoId: String(++id),
      head: formData.get('head') as string,
      content: subtasks,
      isActive: false,
    };
    console.log(newTodo);
    addTodo(newTodo);
    deleteModal('create_Todo');
  };

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
      <TextField id="head" name="head" label="제목" variant="standard" />
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
      <ListBox items={subtasks} itemKey='id' ContentComponent={SubtaskItem}/>
      <BasicButton type="submit"> 새 할일 등록 </BasicButton>
    </Box>
  );
};

export default TodoModal;
