<template>
  <div class="main_inner clearfix">
    <!-- eslint-disable-next-line -->
    <div class="responsibility_area text-justify clearfix" v-html="content">
    </div>
  </div>
</template>

<script>
import { page } from '@/api/common'

export default {

  name: 'Responsibility',
  data() {
    return {
      content: ''
    }
  },
  created() {
  },
  mounted() {
    page({ type: 'responsibility' })
      .then(response => {
        const reqData = response.data
        if (reqData && reqData.status === 200) {
          this.content = reqData.data.content
        }
      })
  }
}
</script>

<style scoped>

</style>
