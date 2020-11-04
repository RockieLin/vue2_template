<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <img src="https://via.placeholder.com/728x90.png">
      </div>
      <br>
      <h2>Something error!</h2>
      <p>
        The page you are looking for might have some problem, please return and try again.
        <br> <br>
        <a href="/">Return </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Critical',
  mounted() {
  },
  destroyed() {
  }
}
</script>

<style scoped>
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
