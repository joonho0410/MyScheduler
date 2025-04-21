// components/Todo/ListTodoItem.tsx
import { TodoType } from '@/Types/Todo';
import { useTodoActions } from '@/Store/TodoStore';;
// import styles from './TodoContent.module.scss';

const ListTodoItem = (props: TodoType) => {
  const { startTodo, endTodo } = useTodoActions();

  return (
    <div>
      <span>{props.head}</span>
      <div>
        {props.isActive ? (
          <button onClick={() => endTodo(props)}>stop</button>
        ) : (
          <button onClick={() => startTodo(props)}>start</button>
        )}
        <button>update</button>
      </div>
    </div>
  );
};

export default ListTodoItem;
