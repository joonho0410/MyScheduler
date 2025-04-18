'use client'

import { ScheduleTodoType } from '@/Types/Todo';
import styles from './Todo.module.scss'
import { useEffect, useState } from 'react';
import { calculateMinutes } from '@/Utils/calculateTime';


const Todo = (props: ScheduleTodoType) => {
    const start = calculateMinutes(props.startTime)
    const [doingTime, setDoingTime] = useState(props.endTime ? calculateMinutes(props.endTime) - start : 0)
    
    const innerStyle = start / 1440 * 8640;

    console.log(doingTime)

    useEffect(() => {
        let id: NodeJS.Timeout | undefined = undefined;
        if (!props.endTime) id = setInterval(() => {
            setDoingTime((state) => state + 1)
        }, 1000)

        return () => clearInterval(id)
    }, [props.endTime])

    return (
        <div className={styles.Todo} style={{
            left: `${innerStyle}px`,
            transform: `scaleX(${doingTime / 60})`,
            transformOrigin: 'left',
        }}>
            Todo
        </div>
    )
}

export default Todo