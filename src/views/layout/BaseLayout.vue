<template>
  <div v-if="$store.getters.errorMessage === null">
    <div class="wrapper_area">
      <header class="header_area clearfix">
        Header Here
      </header>
      <main class="main_area clearfix">
        <slot>
          <router-view />
        </slot>
      </main>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseLayout',
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
