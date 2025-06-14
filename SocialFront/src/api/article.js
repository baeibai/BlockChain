import { request } from "../utilities/request.js";

export function articleChainListApi() {
  return request({
    url: `article/chainList`,
    method: 'get',
  });
}

export function articleChainInfoApi(id) {
  return request({
    url: `article/chainInfo/${id}`,
    method: 'get',
  });
}

export function articleGetApi(id) {
  return request({
    url: `article/${id}`,
    method: 'get',
  });
}

export function commentListApi(id, userId) {
  return request({
    url: `article/commentList/${id}`,
    method: 'get',
    params: {
      userId: userId
    }
  });
}

export function addCommentApi(data) {
  return request({
    url: `article/addComment`,
    method: 'post',
    data
  });
}

export function likeCommentApi(commentId, userId) {
  return request({
    url: `article/likeComment/${commentId}`,
    method: 'post',
    params: {
      userId: userId
    }
  });
}


export function addBookmarkApi(userId, articleId) {
  return request({
    url: `article/addBookmark`,
    method: 'post',
    params: {
      userId: userId,
      articleId: articleId
    }
  });
}

export function removeBookmarkApi(userId, articleId) {
  return request({
    url: `article/removeBookmark`,
    method: 'post',
    params: {
      userId: userId,
      articleId: articleId
    }
  });
}

export function addLikeApi(userId, articleId) {
  return request({
    url: `article/addLike`,
    method: 'post',
    params: {
      userId: userId,
      articleId: articleId
    }
  });
}

export function addDislikeApi(userId, articleId) {
  return request({
    url: `article/addDislike`,
    method: 'post',
    params: {
      userId: userId,
      articleId: articleId
    }
  });
}

export function removeLoveApi(userId, articleId) {
  return request({
    url: `article/removeLove`,
    method: 'post',
    params: {
      userId: userId,
      articleId: articleId
    }
  });
}

export function articlePortApi(data) {
  return request({
    'url': 'article/upload',
    'method': 'post',
    data,
  })
}

export function recordBlockchainApi(data) {
  return request({
    'url': 'article/recordBlockchain',
    'method': 'post',
    data
  })
}

export function articleGptApi(title, content) {
  console.log("aaa", title + content);
  return request({
    'url': 'python/gpt',
    'method': 'post',
    params: {
      title: title,
      content: content
    }
  })
}

export function myArticleListApi(userId, page = 1) {
  const actualPage = page !== null ? page : 1;
  let url = `/article/myList?page=${actualPage}`;
  url += `&userId=${userId}`;
  return request({
      'url': url,
      'method': 'get',
  });
}


