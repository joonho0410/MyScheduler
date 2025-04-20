export type TodoType = {
  todoId: string;
  head: string;
  content: string;
  isActive: boolean;
};

export type ChartTodoType = TodoType & {
  totalTime: number;
};

export type ScheduleTodoType = TodoType & {
  scheduleId: string;
  startTime: Date;
  endTime: Date | null;
};
