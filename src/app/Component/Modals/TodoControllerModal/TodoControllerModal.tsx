import { useCallback } from "react";
import { useModalActions } from "@/Store/ModalStore";
import { useTodoActions, useTodoList } from "@/Store/TodoStore";
import styles from './TodoControllerModal.module.scss'
import { TodoType } from "@/Types/Todo";


const TodoControllModal = () => {
    const todoList = useTodoList();
    const { setModal } = useModalActions();

    return (
        <div className={styles.container}>
            <h2 className={styles.head}>오늘 할 일</h2>
            <div className={styles.todos}>
                {
                    todoList.map((e) => <TodoControllModal.TodoContent {...e} key={e.todoId}/>)
                }
            </div>
            <button onClick={() => setModal('create_Todo')}>
                할일 추가
            </button>
        </div>
    )
}

const TodoContent = (props: TodoType) => {
    const { startTodo, endTodo } = useTodoActions()
    
    return (
        <div className={styles.TodoContent__container}>
            <span className={styles.TodoContent__content}>{props.head}</span>
            <div className={styles.TodoContent__buttons}>
                {props.isActive 
                    ? <button onClick={() => endTodo(props)}> stop </button>
                    : <button onClick={() => startTodo(props)}> start </button>
                }
                <button> update </button>
            </div>
        </div>
    )
}

const AddTodoButton = () => {
    const { setModal } = useModalActions()
    
    const handleClick = useCallback(() => setModal('create_Todo'), [])
    return (
        <button onClick={handleClick}>
            할 일 추가
        </button>
    )
}

TodoControllModal.TodoContent = TodoContent
TodoControllModal.AddTodoButton = AddTodoButton

export default TodoControllModal