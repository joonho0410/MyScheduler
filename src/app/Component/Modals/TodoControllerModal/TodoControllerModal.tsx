import styles from './TodoControllerModal.module.scss';
import { useModalActions } from '@/Store/ModalStore';
import { useTodoActions, useTodoList } from '@/Store/TodoStore';
import { TodoType } from '@/Types/Todo';
import { useCallback } from 'react';
import ListBox from '../../Common/ListBox';
import ListTodoItem from '../../ListCard/ListTodoItem';

const TodoControllModal = () => {
  const todoList = useTodoList();
  const { setModal } = useModalActions();

  return (
    <div className={styles.container}>
      <h2 className={styles.head}>오늘 할 일</h2>
      <ListBox items={todoList} itemKey='todoId' ContentComponent={ListTodoItem}/>
      <button onClick={() => setModal('create_Todo')}>할일 추가</button>
    </div>
  );
};

const TodoContent = (props: TodoType) => {
  const { startTodo, endTodo } = useTodoActions();

  return (
    <div className={styles.TodoContent__container}>
      <span className={styles.TodoContent__content}>{props.head}</span>
      <div className={styles.TodoContent__buttons}>
        {props.isActive ? (
          <button onClick={() => endTodo(props)}> stop </button>
        ) : (
          <button onClick={() => startTodo(props)}> start </button>
        )}
        <button> update </button>
      </div>
    </div>
  );
};

const AddTodoButton = () => {
  const { setModal } = useModalActions();

  const handleClick = useCallback(() => setModal('create_Todo'), []);
  return <button onClick={handleClick}>할 일 추가</button>;
};

TodoControllModal.TodoContent = TodoContent;
TodoControllModal.AddTodoButton = AddTodoButton;

export default TodoControllModal;
