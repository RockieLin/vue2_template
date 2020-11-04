import Cookies from 'js-cookie'
import i18n from '@/i18n'

const user = {
  state: {
    deviceInfo: null,
    memberInfo: null,
    token: null,
    language: Cookies.get('language') || 'zh',
    supportLanguages: [],
    gold: null,
    inviteCode: null
  },
  mutations: {
    SET_MEMBER_INFO: (state, data) => {
      state.memberInfo = data
    },
    SET_TOKEN: (state, data) => {
      state.token = data
    },
    SET_LANGUAGE: (state, language) => {
      if (language !== 'undefined') {
        state.language = language
        Cookies.set('language', language)
        i18n.locale = language
      }
    }
  },
  actions: {
    // 登入
    SetUserData({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_MEMBER_INFO', data.member_info)

        if (data.token !== undefined) {
          commit('SET_TOKEN', data.token.token)
        }

        resolve()
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_MEMBER_INFO', null)
        commit('SET_TOKEN', null)

        resolve()
      })
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default user
