import { createContext } from 'react'
import Axios from 'axios'
import { notification } from 'antd'
import { useContext } from 'react'

export const BASE_API = process.env.REACT_APP_API_BASE

const axios = Axios.create({
  baseURL: BASE_API,
  timeout: 60 * 1000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

axios.interceptors.request.use((config) => {
  // Read token for anywhere, in this case directly from localStorage
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// response interceptor
axios.interceptors.response.use(
  (response) => {
    const data = response.data
    if (response.status === 200) {
      return data
    }

    notification.error({
      message: `Wrong Request ${response.statusText}: ${response}`,
      description: data || response.statusText || 'Error',
    })

    if (response.status === 401) {
      // window.location.href = '/'
    }
    return Promise.reject(new Error(response.statusText || 'Error'))
  },
  (error) => {
    console.log('err:', error) // for debug
    let msg = error.message || 'Wrong Request'

    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: non-signin
        // If you are not logged in, you will be redirected to the login page and carry the path to the current page.
        // To return to the current page after a successful login, this step needs to be done on the login page
        case 401:
        case 403:
          // window.location.href = '/'
          localStorage.clear()
          notification.error({
            message: 'There was a problem',
            description: error.response.data?.msg || 'Error',
          })
          break
        // 404
        case 404:
          notification.error({
            message: `404 Non-exist`,
            description: error.response.data?.msg || 'Error',
          })
          break
        case 406:
          notification.error({
            message: `406 Error parameters`,
            description: error.response.data?.msg || 'Error',
          })
          break
        default:
          notification.error({
            message: `Error request`,
            description: error.response.data?.msg || 'Error',
          })
      }
    } else {
      notification.error({
        message: 'Error Network',
        description: msg,
      })
    }

    return Promise.reject(error)
  }
)

export const AxiosContext = createContext(
  new Proxy(axios, {
    apply: () => {
      throw new Error('You must wrap your component in an AxiosProvider')
    },
    get: () => {
      throw new Error('You must wrap your component in an AxiosProvider')
    },
  })
)

export const useAxios = () => {
  return useContext(AxiosContext)
}

export default axios
