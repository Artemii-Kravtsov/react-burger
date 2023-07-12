const getTime = (dt: Date) => {
    const hours = String(dt.getHours()).padStart(2, '0')
    const minutes = String(dt.getMinutes()).padStart(2, '0')
    return hours + ':' + minutes
}

export const formatDate = (updDateStr: string) => {
    const today = new Date()
    today.setHours(0,0,0,0)
    const yesterday = today 
    yesterday.setDate(yesterday.getDate() - 1)
    const days2ago = today
    days2ago.setDate(yesterday.getDate() - 2)

    const updDate = new Date(updDateStr)
    const updDate2 = new Date(updDateStr)
    updDate2.setHours(0,0,0,0)
    switch (today) {
        case today:
            return 'Сегодня, ' + getTime(updDate)
        case yesterday:
            return 'Вчера, ' + getTime(updDate)
        case days2ago:
            return '2 дня назад, ' + getTime(updDate)
        default:
            return updDate.toLocaleString("ru-RU")
    }
}