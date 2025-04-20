'use client';

import Todo from '../TodoCard/Todo';
import styles from './ScheduleTable.module.scss';
import useDragMove from '@/Hooks/useDragMove';
import { useScheduleTodoList, useCurrentTodo } from '@/Store/TodoStore';

const timeArray: string[] = [];

for (let i = 0; i < 24; i++) {
  timeArray.push(i.toString().padStart(2, '0'));
}

const ScheduleTable = () => {
  const todoList = useScheduleTodoList();
  const currentTodo = useCurrentTodo();

  console.log(todoList, currentTodo);

  return (
    <div className={styles.container}>
      <ScheduleTable.TimeTable>
        {todoList.map(todo => {
          if (!todo.startTime) return null;
          return <Todo key={todo.scheduleId} {...todo}></Todo>;
        })}
      </ScheduleTable.TimeTable>
    </div>
  );
};

const TimeTable = ({ children }: { children?: any }) => {
  const { position, handleMouseDown } = useDragMove();

  return (
    <div
      className={styles.timeTable}
      onMouseDown={handleMouseDown}
      style={{ left: `${position.x}px` }}
    >
      {timeArray.map((time: string) => {
        return (
          <div key={time} className={styles.slot}>
            <div className={styles.timeSlot}> {time} </div>
            <div className={styles.workSlot}></div>
          </div>
        );
      })}
      {children}
    </div>
  );
};

ScheduleTable.TimeTable = TimeTable;

export default ScheduleTable;
