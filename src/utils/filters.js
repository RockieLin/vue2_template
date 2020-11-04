import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFormat', function(value) {
  if (value instanceof Date) {
    return moment(value).format('YYYY/MM/DD')
  } else {
    const microsecond = value * 1000
    const date = new Date(microsecond)
    return moment(date).format('YYYY/MM/DD')
  }
})

Vue.filter('dateTimeFormat', function(value) {
  if (value instanceof Date) {
    return moment(value).format('MM/DD HH:mm')
  } else {
    const microsecond = value * 1000
    const date = new Date(microsecond)
    return moment(date).format('MM/DD HH:mm')
  }
})

Vue.filter('fullDateTimeFormat', function(value) {
  if (value instanceof Date) {
    return moment(value).format('YYYY-MM-DD HH:mm')
  } else {
    const microsecond = value * 1000
    const date = new Date(microsecond)
    return moment(date).format('YYYY-MM-DD HH:mm')
  }
})
