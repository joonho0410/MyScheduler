'use client'

import styles from './Todo.module.scss'

type TodoProps = {
    startTime: Date;
    endTime: Date;
    head: string;
    content: string; 
    done: boolean;
}

const Todo = (props: TodoProps) => {
    const start = props.startTime.getHours() * 60 + props.startTime.getMinutes()
    const innerStyle = start / 1440 * 8640;

    return (
        <div className={styles.Todo} style={{ left: `${innerStyle}px` }}>
            Todo
        </div>
    )
}

export default Todo