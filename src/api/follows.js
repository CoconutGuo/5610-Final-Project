import request from '@/utils/request'

export const FOLLOWING_API = `/following`

export const getFollowingById = async (uid) => {
  return request.get(`${FOLLOWING_API}/${uid}`)
}

export const setFollowingById = async (data) => {
  return request.post(`${FOLLOWING_API}/set` ,data)
}


export const FOLLOWER_API = `/followers`

export const getFollowersByUid = async (uid) => {
  return request.get(`${FOLLOWER_API}/${uid}`)
}

