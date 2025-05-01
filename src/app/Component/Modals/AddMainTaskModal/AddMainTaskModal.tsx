import BasicButton from '../../Common/BasicButton';
import ListBox from '../../Common/ListBox';
import SubtaskItem from '../../ListCard/ListSubtaskItem';
import { useModalActions } from '@/Store/ModalStore';
import { useTodoActions } from '@/Store/TodoStore';
import { TodoSubtaskType, TodoType } from '@/Types/Todo';
import { TextField, Box, Divider } from '@mui/material';
import { useRef, useState, Dispatch, SetStateAction } from 'react';

let id = 1;
const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const AddMainTaskModal = (_: {}) => {
  const [subtasks, setSubtasks] = useState<TodoSubtaskType[]>([]);
  const { deleteModal } = useModalActions();
  const { addTodo } = useTodoActions();

  const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const todoId = String(++id);
    const newTodo: TodoType = {
      todoId: todoId,
      head: formData.get('head') as string,
      content: subtasks.map((task, idx) => {
        return { ...task, todoId };
      }),
      isActive: false,
    };

    addTodo(newTodo);
    deleteModal('add_mainTask');
  };

  return (
    <Box component="form" onSubmit={addNewTodo} sx={modalStyle}>
      <AddMainTaskModal.TaskForm setSubtasks={setSubtasks} />
      <AddMainTaskModal.SubTaskList subtasks={subtasks} setSubtasks={setSubtasks} />
      <BasicButton type="submit"> 새 할일 등록 </BasicButton>
    </Box>
  );
};

const TaskForm = ({
  setSubtasks,
}: {
  setSubtasks: Dispatch<SetStateAction<TodoSubtaskType[]>>;
}) => {
  const subtaskRef = useRef<null | HTMLInputElement>(null);

  const addSubtask = () => {
    if (!subtaskRef.current) return;
    const newSubtask: TodoSubtaskType = {
      todoId: 'not Registred',
      id: String(++id),
      title: subtaskRef.current.value,
      completed: false,
    };
    subtaskRef.current.value = '';
    setSubtasks(prev => [...prev, newSubtask]);
  };

  return (
    <>
      <TextField id="head" name="head" label="제목" variant="standard" />
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <TextField
          inputRef={subtaskRef}
          sx={{ flex: '1 1 auto' }}
          id="todo"
          label="할 일 추가"
          variant="standard"
        />
        <BasicButton sx={{ alignSelf: 'end' }} onClick={addSubtask}>
          추가
        </BasicButton>
      </Box>
    </>
  );
};

const SubTaskList = ({
  subtasks,
  setSubtasks,
}: {
  subtasks: TodoSubtaskType[];
  setSubtasks: Dispatch<SetStateAction<TodoSubtaskType[]>>;
}) => {
  const handleUpdate = (newSubtask: TodoSubtaskType) => {
    setSubtasks(prev =>
      prev.map(subtask => {
        if (subtask.id === subtask.id) return newSubtask;
        return subtask;
      }),
    );
  };

  const handleDelete = (deletedSubtask: TodoSubtaskType) => {
    setSubtasks(prev => prev.filter(subtask => subtask.id !== deletedSubtask.id));
  };

  return (
    <>
      <Divider textAlign="left" sx={{ padding: '20px 20px 0px 20px', color: 'black' }}>
        <h3>할 일 목록</h3>
      </Divider>

      <ListBox
        contents={subtasks.map(subtask => (
          <SubtaskItem
            key={subtask.id}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            {...subtask}
          />
        ))}
      />
    </>
  );
};

AddMainTaskModal.TaskForm = TaskForm;
AddMainTaskModal.SubTaskList = SubTaskList;

export default AddMainTaskModal;
