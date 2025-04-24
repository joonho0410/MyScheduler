export type TodoType = {
  todoId: string;
  head: string;
  content: string | TodoSubtaskType[];
  isActive: boolean;
};

export type TodoSubtaskType = {
  id: string;
  title: string;
  completed: boolean;
} & Pick<TodoType, 'todoId'>;

export type ChartTodoType = TodoType & {
  totalTime: number;
};

export type ScheduleTodoType = TodoType & {
  scheduleId: string;
  startTime: Date;
  endTime: Date | null;
};
