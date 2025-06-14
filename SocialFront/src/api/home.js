import { request } from "../utilities/request.js";

export function articleListApi(userId, boardId, page = 1) {
  let url = `/article/list?page=${page}`;
  
  if (boardId) {
    url += `&boardId=${boardId}`;
  }
  
  if (userId) {
    url += `&userId=${userId}`;
  }

  return request({
      'url': url,
      'method': 'get',
  });
}

export function boardListApi() {
  return request({
      'url': '/board/list',
      'method': 'get',
    })
}

export function searchApi(searchWords) {
  return request({
      'url': `/article/search=${searchWords}`,
      'method': 'get',
    })
}

export function notificationApi(userId) {
  return request({
      'url': `/notification/userid=${userId}`,
      'method': 'get',
    })
}