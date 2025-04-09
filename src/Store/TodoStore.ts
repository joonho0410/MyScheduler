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

export default useTodoStore