import request from '@/utils/request'

export const USERS_API = `/users`

export const signin = async (credentials) => {
  // const response = await request.post(`${USERS_API}/signin`, credentials)
  return request.post(`${USERS_API}/signin`, credentials)
}

export const account = async () => {
  return request.post(`${USERS_API}/account`)
}

export const updateUser = async ( uid, user) => {
  return request.put(`${USERS_API}/${uid}`, user)
}

export const findAllUsers = async () => {
  return request.get(`${USERS_API}`)
}

export const createUser = async (user) => {
  return request.post(`${USERS_API}`, user)
}

export const findUserById = (id) => {
  return request.get(`${USERS_API}/${id}`)
}

export const deleteUser = async (user) => {
  return request.delete(`${USERS_API}/${user._id}`)
}

export const signup = async (credentials) => {
  const response = await request.post(`${USERS_API}/signup`, credentials)
  return response.data
}

export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`)
  return response.data
}
