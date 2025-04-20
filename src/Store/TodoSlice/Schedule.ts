import { TodoStoreType } from '../TodoStore';
import { ScheduleTodoType, TodoType } from '@/Types/Todo';
import { StateCreator } from 'zustand';

type State = {
  ScheduleTodoList: ScheduleTodoType[];
  currentTodo: ScheduleTodoType | null;
};

type Action = {
  scheduleAction: {
    startTodo: (todo: TodoType) => void;
    endTodo: (todo: TodoType) => void;
  };
};

export type ScheduleSliceType = State & Action;

// 나중에 uuid나 Date를 사용한 id 생성필요
let id = 1;

const ScheduleSlice: StateCreator<TodoStoreType, [], [], ScheduleSliceType> = set => ({
  ScheduleTodoList: [],
  currentTodo: null,
  scheduleAction: {
    startTodo: todo =>
      set(state => {
        const curDate = new Date();
        if (state.currentTodo) {
          state.currentTodo.endTime = curDate;
          state.currentTodo = null;
        }
        const newTodayTodoList = state.todayTodoList.map(e => {
          if (e.todoId === todo.todoId) {
            return { ...e, isActive: true };
          }
          return { ...e, isActive: false };
        });
        const newCurrentTodo: ScheduleTodoType = {
          ...todo,
          scheduleId: String(id++),
          startTime: curDate,
          endTime: null,
        };
        const newList = [...state.ScheduleTodoList, newCurrentTodo];

        return {
          todayTodoList: newTodayTodoList,
          ScheduleTodoList: newList,
          currentTodo: newCurrentTodo,
        };
      }),
    endTodo: todo =>
      set(state => {
        if (!state.currentTodo) return state;
        const curDate = new Date();

        const newTodayTodoList = state.todayTodoList.map(e => {
          if (e.todoId === todo.todoId) {
            return { ...e, isActive: false };
          }
          return e;
        });
        const newList = state.ScheduleTodoList.map(e => {
          if (e.endTime) return e;
          e.endTime = curDate;
          return e;
        });

        return { todayTodoList: newTodayTodoList, currentTodo: null, ScheduleTodoList: newList };
      }),
  },
});

export default ScheduleSlice;
