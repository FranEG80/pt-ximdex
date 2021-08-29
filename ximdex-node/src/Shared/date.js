const getNow = () => new Date(Date.now())
const getLocaleTime = () => getNow().toLocaleTimeString()
const getLocaleDate = () => getNow().toLocaleDateString()

export const getDateString = () => `${getLocaleDate()} - ${getLocaleTime()}`
export const getYear = () => getNow().getFullYear()
export const getDay = () => getNow().getDate()
export const getMonth = () => getNow().getMonth() + 1