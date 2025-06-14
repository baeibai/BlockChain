import { request } from "../utilities/request.js";

export function loginApi(data) {
  return request({
    'url': '/user/login',
    'method': 'post',
    data
  })
}

export function signUpApi(data) {
  return request({
    'url': '/user/signUp',
    'method': 'post',
    data
  })
}

export function checkUsernameApi(username) {
  return request({
    'url': `/user/checkUsername/${username}`,
   'method': 'get'
  })
}


