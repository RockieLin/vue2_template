<template>
  <div>
    <bao-alert />
    <router-view v-if="$store.getters.loadCompleted" />
    <!--Loading效果-->
    <loading />
    <!--提醒訊息-->
    <notice />
    <confirm />
  </div>
</template>
<script>

import Loading from '@/components/loading'
import Notice from '@/components/modal/notice'
import Confirm from '@/components/modal/confirm'
import baoAlert from '@/components/alert/baoAlert'
export default {
  name: 'App',
  components: {
    Loading,
    Notice,
    Confirm,
    baoAlert
  }
}
</script>
