import { create } from "zustand";
import ScheduleSlice from "./TodoSlice/Schedule";
import TodaySlice from "./TodoSlice/Today";
import SharedSlice from "./TodoSlice/Shared";

import { TodaySliceType } from "./TodoSlice/Today";
import { ScheduleSliceType } from "./TodoSlice/Schedule";
import { SharedSliceType } from "./TodoSlice/Shared";

import { CombineTypes } from "@/Types/Utils";


type Slices = [TodaySliceType, ScheduleSliceType, SharedSliceType]

export type TodoStoreType = CombineTypes<Slices>

const useTodoStore = create<TodoStoreType>()((...a) => ({
    ...ScheduleSlice(...a),
    ...TodaySlice(...a),
    ...SharedSlice(...a)
}))

export const useTodoList = () => useTodoStore((state) => state.todayTodoList)
export const useScheduleTodoList = () => useTodoStore((state) => state.ScheduleTodoList)
export const useCurrentTodo = () => useTodoStore((state) => state.currentTodo)

export const useTodoActions = () => {
    const todayAction = useTodoStore((state) => state.todayAction)
    const scheduleAction = useTodoStore((state) => state.scheduleAction)

    return {
        ...todayAction,
        ...scheduleAction
    }
}