import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import en from 'vee-validate/dist/locale/en'
import zh_TW from 'vee-validate/dist/locale/zh_TW'
import VeeValidate from 'vee-validate'

Vue.use(VueI18n)
// 預設的語系檔可以放一些未載入語系時的錯誤訊息之類的東西，如果不需要以後可拿掉
const messages = {
}
const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh',
  messages,
  silentTranslationWarn: true
})

// Vee Validate多語系支援
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  },
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  fieldsBagName: 'formFields',
  dictionary: {
    en: en,
    zh: zh_TW
  }
})

export default i18n
