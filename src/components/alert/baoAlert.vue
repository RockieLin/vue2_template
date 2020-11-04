<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="(this.$store.getters.alert &&this.$store.getters.alert.type)? this.$store.getters.alert.type:'success'"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ message }}</p>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'BaoAlert',
  data() {
    return {
      dismissSecs: (this.$store.getters.alert && this.$store.getters.alert.seconds) ? this.$store.getters.alert.seconds : 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  computed: {
    message() {
      if (!this.$store.getters.alert) {
        return ''
      }
      return this.$t(this.$store.getters.alert.message) ? this.$t(this.$store.getters.alert.message) : this.$store.getters.alert.message
    }
  },
  watch: {
    message(newVal, oldVal) {
      if (newVal != null) {
        this.showAlert()
      }
    }
  },
  mounted() {
    this.showAlert()
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
      if (this.dismissCountDown === 0) {
        this.$store.commit('SET_ALERT', null)
      }
    },
    showAlert() {
      if (this.message) {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
}
</script>
