'use client'

import { TodoType } from '@/Types/Todo';
import styles from './Todo.module.scss'

const Todo = (props: TodoType) => {
    const start = props.startTime ? props.startTime.getHours() * 60 + props.startTime.getMinutes() : 0
    const innerStyle = start / 1440 * 8640;

    return (
        <div className={styles.Todo} style={{ left: `${innerStyle}px` }}>
            Todo
        </div>
    )
}

export default Todo