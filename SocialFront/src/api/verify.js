import { request } from "../utilities/request.js";

export function verificationApi(data) {
  return request({
    'url': '/verification/submit',
    'method': 'post',
    data
  })
}

export function getArticleChainIdApi(articleId) {
  return request({
    url: `article/getArticleChainId`,
    method: 'get',
    params: {
      articleId: articleId
    }
  });
}

export function getVerificationApi(page = 1) {
  // console.log("getVerificationApi",page);
  return request({
    url: `/verification/VerificationList?page=${page}`,
    method: 'get',
  });
}

export function getVerificationChainInfoApi(id) {
  return request({
    url: `/verification/getVerificationChainInfo?id=${id}`,
    method: 'get',
  });
}