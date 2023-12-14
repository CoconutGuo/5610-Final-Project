import request from '@/utils/request'

export const USERS_API = `/reviews`

export const getLatestReviews = async () => {
  return request.get(`${USERS_API}/latest`)
}

export const createReview = async (data) => {
  return request.post(`${USERS_API}`, data)
}

export const findPendingReviews = async () => {
  return request.get(`${USERS_API}/pending`)
}

export const changeReviewStatus = async (review) => {
  return request.put(`${USERS_API}/${review._id}`, review)
}

export const findReviewsByUid = async (uid) => {
  return request.get(`${USERS_API}/${uid}`)
}

export const deleteReview = async (review) => {
  return request.delete(`${USERS_API}/${review._id}`)
}
