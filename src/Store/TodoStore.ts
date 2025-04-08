import { create } from "zustand";
import { TodoType } from "@/Types/Todo";

interface TodoState {
    todoList: TodoType[]
    currentTodo: TodoType | null
    addTodo: (todo: TodoType) => void;
    deleteTodo: (todo: TodoType) => void;
    updateTodo: (todo: TodoType) => void;
    startTodo: (todo: TodoType) => void;
    endTodo: () => void;
}

const useTodoStore = create<TodoState>()((set) => ({
    todoList: [],
    currentTodo: null,
    addTodo: (todo) => set((state) => ({...state, todoList: [...state.todoList, todo]})),
    deleteTodo: (todo) => set((state) => ({...state, todoList: state.todoList.filter((e) => e.id !== todo.id)})),
    updateTodo: (todo) => set((state) => {
        const newTodoList = state.todoList.filter((e) => e.id !== todo.id)
        newTodoList.push(todo)
        return {...state, todoList: newTodoList}
    }),
    startTodo: (todo) => set((state) => {
        const curDate = new Date();
        if (state.currentTodo) state.currentTodo.endTime = curDate;

        state.currentTodo = todo;
        todo.startTime = curDate;
        return {...state}
    }),
    endTodo: () => set((state) => {
        const curDate = new Date();

        if (!state.currentTodo) return state;
        state.currentTodo.endTime = curDate;
        state.currentTodo = null

        return {...state}
    })
}))

export default useTodoStore