<template>
  <div>
    <date-range-picker v-model="childDateRange" opens="left" :date-format="dateFormat" :append-to-body="true" :single-date-picker="singleDatePicker" :time-picker="timePicker" :ranges="false" :locale-data="localeData" @update="update">
      <template v-slot:input="picker">
        <div v-if="singleDatePicker" style="width:100%">
          {{ picker.startDate | dateFormat }}
        </div>
        <div v-else>
          {{ picker.startDate | dateFormat }} - {{ picker.endDate | dateFormat }}
        </div>
      </template>
    </date-range-picker>
  </div>
</template>

<script>
import dateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
import { showNotice } from '@/utils/tool'

export default {
  components: {
    dateRangePicker
  },
  props: {
    'value': {
      type: Object,
      default: () => {}
    },
    'singleDatePicker': {
      type: Boolean,
      default: false
    },
    'timePicker': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childDateRange: {},
      localeData: {
        direction: 'ltr',
        separator: ' - ',
        applyLabel: '確定',
        cancelLabel: '取消',
        weekLabel: 'W',
        customRangeLabel: '自選範圍',
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        firstDay: 0
      }
    }
  },
  created() {
    this.childDateRange = this.value
  },
  methods: {
    dateFormat(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() > moment().add(1, 'days').toDate()
      }
      return classes
    },
    update() {
      const diffTime = Math.abs(this.childDateRange.endDate - this.childDateRange.startDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays > 90) {
        this.childDateRange.startDate = moment().subtract(7, 'd').toDate()
        this.childDateRange.endDate = new Date()
        showNotice(this.$t('Bao.date_range_limit'))
      }
      this.$emit('input', this.childDateRange)
      this.$emit('query')
    }
  }
}
</script>

<style scoped>
dd > div {
  width: 100%;
}
</style>
