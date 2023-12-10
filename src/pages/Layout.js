import React from 'react'
import { RollbackOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Layout, Input, Dropdown } from 'antd'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { useUserContext } from '@/store/useUser'
import { signout } from '@/api/login'

const { Header, Footer, Content } = Layout

const footerStyle = { textAlign: 'center' }

function MyLayout() {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useUserContext()

  const toHome = () => {
    navigate('/')
  }
  const onSearch = (val) => {
    navigate(`/search?criteria=${val}`)
  }

  const handelLogout = async () => {
    await signout()
    setUserInfo()
  }
  const items = [
    { key: 'profile', label: <NavLink to="/profile">Profile</NavLink> },
    { key: 'logout', label: <span onClick={handelLogout}>Logout</span> },
  ]

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <div className="flex items-center justify-between ">
          <Button
            type="text"
            icon={<HomeOutlined />}
            onClick={toHome}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: '#fff',
            }}
            className="hover:!bg-gray-800"
          />
          <Button
            type="text"
            icon={<RollbackOutlined />}
            onClick={() => navigate(-1)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: '#fff',
            }}
            className="hover:!bg-gray-800 mr-2"
          />
          <Input.Search placeholder="Search OMDB" onSearch={onSearch}></Input.Search>
          {userInfo ? (
            <Dropdown menu={{ items }}>
              <Button type="text" className="font-medium text-white hover:!text-white hover:!bg-gray-700" icon={<UserOutlined />} ghost>
                {userInfo.username}
              </Button>
            </Dropdown>
          ) : (
            <Button type="text" className="font-medium text-white hover:!text-white hover:!bg-gray-700">
              <NavLink to="/login">Sign in</NavLink>
            </Button>
          )}
        </div>
      </Header>
      <Content className="mx-4 min-h-[80vh] mt-4">
        <Outlet />
      </Content>
      <Footer style={footerStyle}>OMDB</Footer>
    </Layout>
  )
}

export default MyLayout
