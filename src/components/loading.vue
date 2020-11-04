<template>
  <div v-if="$store.getters.isLoading" id="loading-overlay">
    {{ loadingLabel }} ...
    <br>
    <img style="width: 40px; margin-top: 20px;" src="/images/loading/loading.svg">
  </div>
</template>

<script>

export default {
  name: 'Loading',
  computed: {
    loadingLabel() {
      return this.$te('Bao.loading') ? this.$t('Bao.loading') : 'Loading'
    }
  }
}
</script>

<style scoped>
    #loading-overlay {
        position: fixed;
        background-color: #000000;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1030;
        color: #FFF;
        text-align: center;
        padding-top: 45vh;
        font-size: 2vh;
        overflow-y: hidden;
        opacity: 0.8;
    }
</style>
