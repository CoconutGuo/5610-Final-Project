import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Card, message } from 'antd'
import Logo from '@/assets/ka.png'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'

import { signin } from '@/api/login'
import { useUserContext } from '@/store/useUser'

const Login = () => {
  const { setUserInfo } = useUserContext()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      console.log('Received values of form: ', values)
      const res = await signin(values)
      console.log('🚀 ~ file: index.js:14 ~ onFinish ~ res:', res)
      setUserInfo(res)
      message.success('Login success!')
      if (res.role == 'ADMIN') {
        navigate('/admin', { replace: true })
      } else if (res.role == 'REVIEW') {
        navigate('/review', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js:17 ~ onFinish ~ error:', error)
    }
  }

  return (
    <>
      <img src={Logo} alt="" className="block h-20 mx-auto mt-4" />
      <Card className="mx-auto mt-4 w-96" bordered>
        <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or{' '}
            <Link to="/register">
              <Button type="link">register now!</Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
export default Login
