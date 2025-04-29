import { TodoStoreType } from '../TodoStore';
import { TodoType } from '@/Types/Todo';
import { StateCreator } from 'zustand';

type State = {
  todayTodoList: TodoType[];
};

type Action = {
  todayAction: {
    addTodo: (todo: TodoType) => void;
    deleteTodo: (todo: TodoType) => void;
  };
};

export type TodaySliceType = State & Action;

const TodaySlice: StateCreator<TodoStoreType, [], [], TodaySliceType> = set => ({
  todayTodoList: [],
  todayAction: {
    addTodo: todo => set(state => ({ todayTodoList: [...state.todayTodoList, todo] })),
    deleteTodo: todo =>
      set(state => {
        if (state.currentTodo?.todoId === todo.todoId) {
          // 추후에 에러 처리 필요
          console.log('current todo is active');
          return state;
        }
        const newList = state.todayTodoList.filter(e => e.todoId !== todo.todoId);
        return { todayTodoList: newList };
      }),
  },
});

export default TodaySlice;
