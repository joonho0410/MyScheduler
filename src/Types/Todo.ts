export type TodoType = {
    todoId: string,
    head: String,
    content: String,
}

export type ScheduleTodoType = TodoType & {
    scheduleId: string,
    startTime: Date,
    endTime: Date | null,
}
