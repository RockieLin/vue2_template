import request from '@/services/request'

export function login(object) {
  return request({
    url: '/user/login',
    method: 'post',
    data: object
  })
}
