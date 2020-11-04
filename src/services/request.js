import axios from 'axios'
import store from '@/store'
import router from '@/router'
import i18n from '@/i18n'
import { showNotice, toErrorPage } from '@/utils/tool'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    const formData = new FormData()
    for (var key in config['data']) {
      if (config['data'][key] !== null && config['data'][key] !== undefined) {
        formData.set(key, config['data'][key])
      }
    }

    if (store.getters.token) {
      formData.set('token', store.getters.token)
    }

    if (!formData.has('language')) {
      formData.set('language', store.getters.language)
    }

    config['data'] = formData

    // store.commit('SET_LOADING', true)
    return config
  },
)

// response interceptor
service.interceptors.response.use(
  function(response) {
    // store.commit('SET_LOADING', false)
    return response
  },
  error => {
    store.commit('SET_LOADING', false)
    if (error.response === undefined) {
      // 其他錯誤訊息
      const msg = i18n.te('Bao.please_check_network') ? i18n.t('Bao.please_check_network') : 'Please check your network status'
      showNotice(msg, function() {
        if (router.currentRoute.name === 'error' || router.currentRoute.name === 'critical') {
          window.top.location.href = '/'
        } else {
          window.top.location.reload()
        }
      })
    } else {
      const content = error.response.data
      // console.clear()
      if (content.status === 401) {
        store.dispatch('LogOut').then(() => {
          // 重新登入
          showNotice(content.msg, function() {
            if (router.currentRoute.name !== 'login') {
              window.top.location.href = '/user/login'
            }
          })
        })
      } else if (content.status === 403) {
        // 權限不足 回首頁
        showNotice(content.msg, function() {
          router.push({ path: '/index' })
        })
      } else if (content.status === 503) {
        // 轉向維護頁面
        toErrorPage(content.data.content)
      } else if (content.status === 406) {
        // 表單欄位顯示 不由這邊處理
      } else if (content.status === 505) {
        // 不由這邊處理
      } else {
        // 其他錯誤訊息
        showNotice(content.msg)
      }
    }

    return Promise.reject(error)
  }
)

export default service
