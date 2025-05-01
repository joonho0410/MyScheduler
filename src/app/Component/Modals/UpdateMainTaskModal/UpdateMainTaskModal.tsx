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

const UpdateMainTaskModal = ({todoId, head, content, isActive }: TodoType) => {
  const [subtasks, setSubtasks] = useState<TodoSubtaskType[]>(content);

  const handleSave = (e: any) => {

  };

  return (
    <Box sx={modalStyle}>
      <TextField disabled value={head} id="head" name="head" label="제목" variant="standard" />
      <UpdateMainTaskModal.TaskForm setSubtasks={setSubtasks} />
      <UpdateMainTaskModal.SubTaskList subtasks={subtasks} setSubtasks={setSubtasks} />
      <BasicButton onClick={handleSave}> 저장 하기 </BasicButton>
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

UpdateMainTaskModal.TaskForm = TaskForm;
UpdateMainTaskModal.SubTaskList = SubTaskList;

export default UpdateMainTaskModal;
