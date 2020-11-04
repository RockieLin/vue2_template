<template>
  <div class="intro_area clearfix">
    Home
    <br/>
    <router-link :to="'/user/login'">
      Login
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  }
}
</script>
