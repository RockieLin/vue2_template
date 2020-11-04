import request from '@/services/request'

export function loadLanguageAsync(object) {
  return request({
    url: '/common/get-language-messages',
    method: 'post',
    data: object
  })
}
