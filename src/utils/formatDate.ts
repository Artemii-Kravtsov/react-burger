const getTime = (dt: Date) => {
    const hours = String(dt.getHours()).padStart(2, '0')
    const minutes = String(dt.getMinutes()).padStart(2, '0')
    return hours + ':' + minutes
}

export const formatDate = (updDateStr: string) => {
    const today = new Date()
    const yesterday = new Date(Date.now() - 86400000)
    const days2ago = new Date(Date.now() - (86400000 * 2))
    today.setHours(0,0,0,0)
    yesterday.setHours(0,0,0,0)
    days2ago.setHours(0,0,0,0)

    const updDate = new Date(updDateStr)
    const updDate2 = new Date(updDateStr)
    updDate2.setHours(0,0,0,0)
    switch (updDate2.toDateString()) {
        case today.toDateString():
            return 'Сегодня, ' + getTime(updDate)
        case yesterday.toDateString():
            return 'Вчера, ' + getTime(updDate)
        case days2ago.toDateString():
            return '2 дня назад, ' + getTime(updDate)
        default:
            return updDate.toLocaleString("ru-RU")
    }
}