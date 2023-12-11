import React, { useEffect, useState, useMemo } from 'react'
import { Card, Button, Form, Input, Select, message, Descriptions, Modal, Space, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { updateUser } from '@/api/login'
import { getFollowingById } from '@/api/follows'
import { useUserContext } from '@/store/useUser'

const { Option } = Select

function Profile() {
  const { userInfo, setUserInfo } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const items = useMemo(() => {
    delete userInfo.password
    return Object.keys(userInfo).map((key) => ({
      key: key,
      label: key,
      children: userInfo[key],
    }))
  }, [userInfo])

  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      delete values.confirm
      //   todo modify
      const res = await updateUser(userInfo._id, values)
      setUserInfo({ ...userInfo, ...values })
      message.success('update success!')
      setIsModalOpen(false)
    } catch (error) {
      console.log('🚀 ~ file: index.js:17 ~ onFinish ~ error:', error)
    }
  }

  const [following, setFollowing] = useState([])
  const fetchFollowings = async () => {
    const res = await getFollowingById(userInfo._id)
    setFollowing(res.following)
  }
  useEffect(() => {
    fetchFollowings()
  }, [])

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card bordered>
        <Descriptions
          title="User Info"
          items={items}
          extra={
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Edit
            </Button>
          }
        />
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
          <Form layout="vertical" form={form} name="register" initialValues={userInfo} style={{ maxWidth: 600 }} scrollToFirstError>
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
              //   rules={[
              //     {
              //       required: true,
              //       message: 'Please input your password!',
              //     },
              //   ]}
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
                // {
                //   required: true,
                //   message: 'Please confirm your password!',
                // },
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
          </Form>
        </Modal>
      </Card>
      <Card>
        <List
          header={<div>You Following</div>}
          itemLayout="horizontal"
          dataSource={following}
          bordered={false}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                title={<Link to={`/profile/${item._id}`}>{item.username}</Link>}
              />
            </List.Item>
          )}
        />
      </Card>
    </Space>
  )
}

export default Profile
