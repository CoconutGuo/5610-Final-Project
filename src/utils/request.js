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
      message: `请求错误 ${response.statusText}: ${response}`,
      description: data || response.statusText || 'Error',
    })

    if (response.status === 401) {
      // window.location.href = '/'
    }
    return Promise.reject(new Error(response.statusText || 'Error'))
  },
  (error) => {
    console.log('err:', error) // for debug
    let msg = error.message || '请求错误'

    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
        case 403:
          // window.location.href = '/'
          localStorage.clear()
          notification.error({
            message: 'There was a problem',
            description: error.response.data?.msg || 'Error',
          })
          break
        // 404请求不存在
        case 404:
          notification.error({
            message: `请求不存在`,
            description: error.response.data?.msg || 'Error',
          })
          break
        case 406:
          notification.error({
            message: `请求参数有误`,
            description: error.response.data?.msg || 'Error',
          })
          break
        default:
          notification.error({
            message: `请求错误`,
            description: error.response.data?.msg || 'Error',
          })
      }
    } else {
      notification.error({
        message: '网络错误',
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
