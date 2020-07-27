import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en'

export default (date) => {
  dayjs.extend(relativeTime)
  return dayjs(date).fromNow()
}
