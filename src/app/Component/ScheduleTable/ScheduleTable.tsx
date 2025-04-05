import styles from './ScheduleTable.module.scss'
import Todo from '../TodoCard/Todo'

const sampleTodo = {
    startTime: new Date(2025, 3, 3, 1, 0, 0), // 2025년 4월 3일 01:00:00
    endTime: new Date(2025, 3, 3, 2, 0, 0),   // 2025년 4월 3일 02:00:00
    head: '테스트',
    content: '테스트', 
    done: true
}

const ScheduleTable = () => {
    
    return (
        <div className={styles.container}>
            <ScheduleTable.TimeTable/>
            <Todo {...sampleTodo}></Todo>
        </div>
    )
}

const timeArray: string[] = [];
for (let i = 0; i < 24; i++) {
  timeArray.push(i.toString().padStart(2, '0'));
}

const TimeTable = ({children} : {children? : any}) => {

    return (
        <div className={styles.timeTable}> 
            {timeArray.map((time : string) => {
                return (
                    <div key={time} className={styles.slot}>
                        <div className={styles.timeSlot}> {time} </div>        
                        <div className={styles.workSlot}></div>
                    </div>
                )    
            })}
            {children}
        </div>
    )
}

ScheduleTable.TimeTable = TimeTable

export default ScheduleTable