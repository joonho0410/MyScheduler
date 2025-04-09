import { StateCreator } from "zustand";
import { TodoType } from "@/Types/Todo";
import { TodoStoreType } from "../TodoStore";
type State = {
    todayTodoList: TodoType[]
}

type Action = {
    addTodo: (todo: TodoType) => void
    deleteTodo: (todo: TodoType) => void
}

export type TodaySliceType = State & Action

const TodaySlice: StateCreator<
    TodoStoreType,
    [],
    [],
    TodaySliceType
> = (set) => ({
    todayTodoList: [],
    addTodo: (todo) => set((state) => ({ todayTodoList: [...state.todayTodoList, todo] })),
    deleteTodo: (todo) => set((state) => {
        const newList = state.todayTodoList.filter((e) => e.todoId !== todo.todoId)
        return ({todayTodoList: newList})
    })
})

export default TodaySlice