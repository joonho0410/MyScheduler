import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useMemo } from 'react';

import useModalStore from '@/Store/ModalStore';
import { useTodoActions, useTodoList } from '@/Store/TodoStore';
import { ModalType } from '@/Types/Modals';
import { TodoType } from '@/Types/Todo';


const makeItems = (todoList: TodoType[], setModal: (modalType: ModalType) => void) => {
    const items: MenuProps['items'] = []

    todoList.forEach((todo) => {
        const item = {
            label: (
                <AddTodoButton.Todo todo={todo}/>
            ),
            key: todo.todoId
        }
        items.push(item)
    })
    items.push({type: 'divider'})
    items.push({label: (<button onClick={() => setModal('create_Todo')}> 할 일 추가 </button>), key: 'create_Todo'})

    return items
}

const AddTodoButton = () => {
    const todoList = useTodoList();
    const { setModal } = useModalStore();

    const items = useMemo(() => {
        return makeItems(todoList, setModal)
    }, [todoList, setModal])

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
            <Space>
                Click me
            </Space>
            </a>
        </Dropdown>
    )
}

const Todo = ({ todo } : { todo: TodoType}) => {
    const { startTodo, endTodo } = useTodoActions()

    console.log('todo : ', todo)
    return (
        <div>
            <span> {todo.head} </span>
            {todo.isActive 
                ? <button onClick={() => endTodo(todo)}> end</button> 
                : <button onClick={() => startTodo(todo)}> start </button>
            }
            <button> update </button>
        </div>
    )
}

AddTodoButton.Todo = Todo
export default AddTodoButton