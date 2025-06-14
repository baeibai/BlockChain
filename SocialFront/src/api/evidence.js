import { request } from "../utilities/request.js";

export function getEvidenceApi(id, userId) {
  return request({
    url: `evidence/list`,
    method: 'get',
    params:{
      id: id,
      userId: userId
    }
  });
}

export function uploadEvidenceApi(data) {
  return request({
    url: `evidence/upload`,
    method: 'post',
    data
  });
}

export function supportEvidenceApi(userId, evidenceId) {
  return request({
    url: `evidence/support`,
    method: 'post',
    params: {
      userId: userId,
      evidenceId: evidenceId
    }
  });
}

export function getEvidenceChainInfoApi(evidenceId) {
  return request({
    url: `evidence/getEvidenceChainInfo?id=${evidenceId}`,
    method: 'get'
  });
}

