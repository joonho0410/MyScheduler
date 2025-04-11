export type TodoType = {
    todoId: string,
    head: String,
    content: String,
    isActive: boolean
}

export type ScheduleTodoType = TodoType & {
    scheduleId: string,
    startTime: Date,
    endTime: Date | null,
}
