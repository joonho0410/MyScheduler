import PieChart from '../../Chart/Chart';
import styles from './ShowTodoModal.module.scss';
import { useScheduleTodoList } from '@/Store/TodoStore';
import { ChartTodoType, ScheduleTodoType, TodoType } from '@/Types/Todo';
import { calculateMinutes, calculateSeconds } from '@/Utils/calculateTime';
import { useMemo, useState } from 'react';

const makeData = (List: ScheduleTodoType[]): ChartTodoType[] => {
  const map = new Map();
  const curDate = new Date();
  List.forEach(todo => {
    if (!map.has(todo.todoId)) map.set(todo.todoId, { ...todo, totalTime: 0 });
    const val: ChartTodoType = map.get(todo.todoId);
    val.totalTime += calculateSeconds(todo.endTime ?? curDate) - calculateSeconds(todo.startTime);
  });

  return Array.from(map.values());
};

const ShowTodayModal = ({ test }: { test?: string }) => {
  const [selectedTodo, setSelectedTodo] = useState<null | TodoType>(null);
  const TodayTodoList = useScheduleTodoList();
  const curDate = new Date();
  const todoData = useMemo(() => makeData(TodayTodoList), [TodayTodoList]);

  const totalTime = TodayTodoList.reduce((sum, todo) => {
    const [startTime, endTime] = [todo.startTime, todo.endTime ?? curDate];
    return sum + calculateMinutes(endTime) - calculateMinutes(startTime);
  }, 0);

  return (
    <div className={styles.container}>
      <h2>
        {' '}
        전체 시간 : {Math.floor(totalTime / 60)} 시간 {totalTime % 60} 분{' '}
      </h2>
      <PieChart data={todoData} setSelected={setSelectedTodo} />
      {selectedTodo ? <ShowTodayModal.showDetail todo={selectedTodo} /> : null}
    </div>
  );
};

const ShowDetail = ({ todo }: { todo: TodoType }) => {
  return (
    <div>
      <h1>{todo.head}</h1>
      {/* {todo.content} */}
    </div>
  );
};

ShowTodayModal.showDetail = ShowDetail;

export default ShowTodayModal;
