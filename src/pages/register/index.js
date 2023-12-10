import React from 'react'
import { Card, Button, Form, Input, Select, message } from 'antd'
import { useNavigate } from 'react-router'
import Logo from '@/assets/ka.png'

import { createUser } from '@/api/login'
import { useUserContext } from '@/store/useUser'


const { Option } = Select

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const Register = () => {
  const { setUserInfo } = useUserContext()
  const navigate =  useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    try {
      const res = await createUser(values)
      console.log('🚀 ~ file: index.js:14 ~ onFinish ~ res:', res)
      setUserInfo(res)
      message.success("register success!")
      navigate('/')
    } catch (error) {
      console.log('🚀 ~ file: index.js:17 ~ onFinish ~ error:', error)
    }
  }

  return (
    <>
      <img src={Logo} alt="" className="block h-20 mx-auto mt-4" />
      <Card className="mx-auto mt-4 w-96" bordered>
        <Form layout="vertical" form={form} name="register" onFinish={onFinish} style={{ maxWidth: 600 }} scrollToFirstError>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your Username',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Select placeholder="select your gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="intro" label="Intro">
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
export default Register
