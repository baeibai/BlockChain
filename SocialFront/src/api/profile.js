import { request } from "../utilities/request.js";


export function profileApi(id, userId) {
    return request({
        'url': `/profile/list`,
        'method': 'get',
        params: {
            'id': id,
            'userId': userId
        }
    })
}

export function myArticleApi(userId) {
    return request({
        'url': `/profile/myarticle=${userId}`,
        'method': 'get',
    })
}


export function editApi(userId) {
    return request({
        'url': `/profile/edit=${userId}`,
        'method': 'get',
    })
}

export function myfollowerApi(userId) {
    return request({
        'url': `/profile/myfollowing=${userId}`,
        'method': 'get',
    })
}

export function myfollowedApi(userId) {
    return request({
        'url': `/profile/myfollowed=${userId}`,
        'method': 'get',
    })
}

export function myfollowboardApi(userId) {
    return request({
        'url': `/profile/myfollowboard=${userId}`,
        'method': 'get',
    })
}

export function mybookmarkApi(userId) {
    return request({
        'url': `/profile/mybookmark/${userId}`,
        'method': 'get',
    })
}

export function putprofileApi(data) {
    return request({
        'url': `/profile/put`,
        'method': 'put',
        'data': data
    })
}

export function uploadImageApi(data) {
    return request({
        url: `/profile/upload`,
        method: 'put',
        data,
    });
}
export function trackApi(id, userId) {
    return request({
        'url': `/profile/track`,
        'method': 'post',
        params: {
            'userId': userId,
            'id': id
        }
    })
}

export function unTrackApi(id, userId) {
    return request({
        'url': `/profile/unTrack`,
        'method': 'post',
        params: {
            'userId': userId,
            'id': id
        }
    })
}


