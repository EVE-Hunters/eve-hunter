import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import minMax from 'dayjs/plugin/minMax'
dayjs.extend(utc)
dayjs.extend(minMax)

export default dayjs
