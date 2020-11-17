import moment from 'moment'

export default function (date: string | Date, format = 'YYYY-MM-DD hh:mm:ss') {
  return moment(date).format(format)
}
