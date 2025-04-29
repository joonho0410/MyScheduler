import BasicButton from '../../Common/BasicButton';
import ListBox from '../../Common/ListBox';
import ListTodoItem from '../../ListCard/ListTodoItem';
import styles from './TodoControllerModal.module.scss';
import { useModalActions } from '@/Store/ModalStore';
import { useTodoList } from '@/Store/TodoStore';
import { Box } from '@mui/material';

const ShowMainTaskModal = (_: {}) => {
  const todoList = useTodoList();
  const { setModal } = useModalActions();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '30vh' }}>
      <h2 className={styles.head}>오늘 할 일</h2>
      <ListBox
        contents={todoList.map(e => (
          <ListTodoItem key={e.todoId} {...e} />
        ))}
      />
      <BasicButton
        sx={{ width: '100%', justifySelf: 'end' }}
        onClick={() => setModal({ type: 'add_mainTask', props: {} })}
      >
        할 일 추가
      </BasicButton>
    </Box>
  );
};

export default ShowMainTaskModal;
