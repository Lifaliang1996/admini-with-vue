import formatDate from '@/utils/format-date'

export default {
  methods: {
    formatDate (date: string | Date, format = 'YYYY-MM-DD hh:mm') {
      return formatDate(date, format)
    }
  }
}
