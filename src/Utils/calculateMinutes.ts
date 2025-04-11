const calculateMinutes = (date: Date) => {
    return date.getHours() * 60 + date.getMinutes();
}

export default calculateMinutes