import { StateCreator } from "zustand";
import { ScheduleTodoType, TodoType } from "@/Types/Todo";
import { TodoStoreType } from "../TodoStore";

type State = {
    ScheduleTodoList: ScheduleTodoType[]
    currentTodo: ScheduleTodoType | null
}

type Action = {
    startTodo: (todo: TodoType) => void
    endTodo: (todo: ScheduleTodoType) => void
}

export type ScheduleSliceType = State & Action

// 나중에 uuid나 Date를 사용한 id 생성필요
let id = 1;

const ScheduleSlice: StateCreator<
    TodoStoreType,
    [],
    [],
    ScheduleSliceType
>  = (set) => ({
        ScheduleTodoList: [],
        currentTodo: null,
        startTodo: (todo) => set((state) => {
            const curDate = new Date();
            if (state.currentTodo) { 
                state.currentTodo.endTime = curDate;
                state.currentTodo = null;
            }

            const newCurrentTodo: ScheduleTodoType = {...todo, scheduleId: String(id++), startTime: curDate, endTime: null}
            const newList = [...state.ScheduleTodoList, newCurrentTodo]

            return { ScheduleTodoList: newList, currentTodo: newCurrentTodo };
        }),
        endTodo: (todo) => set((state) => {
            if (!state.currentTodo) return state;
            const curDate = new Date();

            const newList = state.ScheduleTodoList.map((e) => {
                if (e.scheduleId !== todo.scheduleId) return e;
                e.endTime = curDate;
                return e;
            })

            return {currentTodo: null, ScheduleTodoList: newList}
        })
    })

export default ScheduleSlice