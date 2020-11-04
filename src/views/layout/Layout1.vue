<template>
  <base-layout>
    <div class="container">
      Layout1 content here...
      <router-view />
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from './BaseLayout'

export default {
  name: 'Layout1',
  components: {
    BaseLayout
  }
}
</script>

<style scoped>
</style>
