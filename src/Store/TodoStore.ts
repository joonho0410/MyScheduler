import { create } from "zustand";
import { TodoType } from "@/Types/Todo";

interface TodoState {
    todoList: TodoType[]
    currentTodo: TodoType | null
    addTodo: (todo: TodoType) => void;
    deleteTodo: (todo: TodoType) => void;
    updateTodo: (todo: TodoType) => void;
    startTodo: (todo: TodoType) => void;
    endTodo: (todo: TodoType) => void;
}

const useTodoStore = create<TodoState>()((set) => ({
    todoList: [],
    currentTodo: null,
    addTodo: (todo) => set((state) => ({...state, todoList: [...state.todoList, todo]})),
    deleteTodo: (todo) => set((state) => ({...state, todoList: state.todoList.filter((e) => e.id !== todo.id)})),
    updateTodo: (todo) => set((state) => state),
    startTodo: (todo) => set((state) => ({...state, currentTodo: todo})),
    endTodo: (todo) => set((state) => ({...state, currentTodo: null}))
}))

export default useTodoStore