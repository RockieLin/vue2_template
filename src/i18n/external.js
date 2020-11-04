import i18n from '@/i18n/index'
import store from 'vuex-store/index'
import { loadLanguageAsync } from '@/api/common'

export function getMessagePack(lang) {
  const supportLanguages = store.getters.supportLanguages || []
  if (!supportLanguages.includes(lang)) {
    lang = 'zh'
  }

  return loadLanguageAsync({ language: lang }).then((response) => {
    const Bao = response.data.data
    const messages = { ...i18n.messages[lang], Bao }
    i18n.setLocaleMessage(lang, messages)
    store.commit('SET_LANGUAGE', lang)
  })
}
