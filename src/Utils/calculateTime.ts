export const calculateMinutes = (date: Date) => {
    return date.getHours() * 60 + date.getMinutes();
}
export const calculateSeconds = (date: Date) => {
    return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
}
