<!-- eslint-disable -->
<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <img src="https://via.placeholder.com/728x90.png">
      </div>
      <br><br>
      <p>
        <span v-html="message"/>
        <br> <br>
        <a href="/">{{ returnLabel }} </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data() {
    return {
      message: this.$t('Remote.sorry_for_the_error'),
      returnLabel: 'Return'
    }
  },
  created() {
    this.message = this.$store.getters.errorMessage ? this.$store.getters.errorMessage : this.$t('Remote.sorry_for_the_error')
    this.$store.commit('SET_ERROR_MESSAGE', null)
    console.log(this.$store.getters.brand)
  },
  mounted() {

    this.returnLabel = this.$te('Remote.return') ? this.$t('Remote.return') : 'Return'
  }
}
</script>

<style scoped>
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
