import store from '@/store'
import router from '@/router'
import i18n from '@/i18n'

export function setErrorMessage(response, errors) {
  errors.items = []
  if (response !== undefined && response.status !== undefined && response.status === 406) {
    let lastError = i18n.t('Bao.sorry_for_the_error')
    Object.keys(response.data.data).forEach(key => {
      lastError = response.data.data[key][0]
      errors.add({
        field: key,
        msg: lastError
      })
    })
  }
}

export function toErrorPage(message) {
  store.commit('SET_ERROR_MESSAGE', message)
  router.push({ path: '/error' }, () => {
  })
}

export function copyText(message) {
  var aux = document.createElement('input')

  // Assign it the value of the specified element
  aux.setAttribute('value', message)

  // Append it to the body
  document.body.appendChild(aux)

  // Highlight its content
  aux.select()

  // Copy the highlighted text
  document.execCommand('copy')

  // Remove it from the body
  document.body.removeChild(aux)

  showNotice(i18n.t('Bao.copy_ok'))
}

export function showNotice(message, func) {
  const data = {
    message: message,
    func: func
  }
  store.commit('SET_NOTICE_MESSAGE', data)
}

export function showConfirm(message, func) {
  if (typeof func === 'function') {
    const confirm = {
      message: message,
      func: func
    }
    store.commit('SET_CONFIRM_DIALOG', confirm)
  }
}

export function showAlert(type, message, seconds) {
  const alert = {
    type: type,
    seconds: seconds,
    message: message
  }
  store.commit('SET_ALERT', alert)
}

export function stripTags(input) {
  var html = '<p>' + input + '</p>'
  var div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
