import ScheduleSlice from './TodoSlice/Schedule';
import { ScheduleSliceType } from './TodoSlice/Schedule';
import SharedSlice from './TodoSlice/Shared';
import { SharedSliceType } from './TodoSlice/Shared';
import TodaySlice from './TodoSlice/Today';
import { TodaySliceType } from './TodoSlice/Today';
import { CombineTypes } from '@/Types/Utils';
import { create } from 'zustand';

type Slices = [TodaySliceType, ScheduleSliceType, SharedSliceType];

export type TodoStoreType = CombineTypes<Slices>;

const useTodoStore = create<TodoStoreType>()((...a) => ({
  ...ScheduleSlice(...a),
  ...TodaySlice(...a),
  ...SharedSlice(...a),
}));

export const useTodoList = () => useTodoStore(state => state.todayTodoList);
export const useScheduleTodoList = () => useTodoStore(state => state.ScheduleTodoList);
export const useCurrentTodo = () => useTodoStore(state => state.currentTodo);

export const useTodoActions = () => {
  const todayAction = useTodoStore(state => state.todayAction);
  const scheduleAction = useTodoStore(state => state.scheduleAction);

  return {
    ...todayAction,
    ...scheduleAction,
  };
};
