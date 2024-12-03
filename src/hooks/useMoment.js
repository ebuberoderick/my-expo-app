import dayjs from 'dayjs';
export const moment = (e) => {
    const date = dayjs(new Date())
    const val = Math.round(date.diff(e, "second", true)) + " seconds"
    return val
}