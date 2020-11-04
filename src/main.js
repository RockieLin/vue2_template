import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import '@/assets/style.css'
import '@/assets/custom.css'
import router from './router'
import i18n from './i18n'
import store from './store'
import { getMessagePack } from './i18n/external'
import { showNotice } from '@/utils/tool'
import '@/utils/filters'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

// 不能在iframe中
if (window !== window.top) {
  window.top.location.href = window.location.href
}

// 需要登入的頁面判斷
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.needLogin) {
    if (!store.getters.token) {
      router.push({ path: '/user/login' }, () => {
      })
      showNotice(i18n.t('Remote.please_login_first'))
    }
  }
  next()
})

store.commit('SET_LOADING', true)
store.commit('SET_LOAD_COMPLETED', false)

new Vue({
  router,
  i18n,
  store,
  created() {
    import('@/assets/' + process.env.VUE_APP_THEME + '/ui.css')

    store.commit('SET_NOTICE_MESSAGE', null)
    store.commit('SET_LOADING', false)
    store.commit('SET_LOAD_COMPLETED', true)
    // 偵測與系參數
    const language = new URL(window.location.href || document.location.href).searchParams.get('language') || Cookies.get('language')

    // getMessagePack(language).then((response) => {
    //   store.commit('SET_LOADING', false)
    //   store.commit('SET_LOAD_COMPLETED', true)
    // }).catch(() => {
    //   store.commit('SET_LOADING', false)
    //   // 基本參數查不到 導向錯誤頁
    //   store.commit('SET_LOAD_COMPLETED', true)
    //
    //   if (store.getters.errorMessage === null) {
    //     router.push({ path: '/critical' }, () => {
    //     })
    //   }
    // })
  },
  render: h => h(App)
}).$mount('#app')
