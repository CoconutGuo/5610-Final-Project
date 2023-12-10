import { useLocalStorageState, useCookieState } from 'ahooks'
import { account } from '@/api/login'
import { createContext, useContext, useEffect } from 'react'

const Context = createContext('user-option')

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useLocalStorageState('userinfo')
  const [userCookie, setUserCookie] = useCookieState('connect.sid')
  const getUserInfo = async () => {
    const res = await account()
    if (res) {
      setUserInfo(res)
    } else {
      setUserInfo()
      setUserCookie()
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  let userOpt = { userInfo, setUserInfo, getUserInfo, userCookie, setUserCookie }
  return <Context.Provider value={userOpt}>{children}</Context.Provider>
}

export const useUserContext = () => useContext(Context)
