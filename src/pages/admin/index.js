import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, message, Tag, Modal, Space, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { findAllUsers, deleteUser, createUser } from '@/api/login'

const { Option } = Select

const RoleColor = {
  ADMIN: 'red',
  USER: '',
  REVIEW: 'blue',
}

const Admin = () => {
  const columns = [
    { title: 'ID', dataIndex: '_id', key: 'id' },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <Link to={`/profile/${record._id}`}>{text}</Link>,
    },
    { title: 'Nickname', dataIndex: 'nickname', key: 'nickname' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (text) => <Tag color={RoleColor[text]}>{text.toUpperCase()}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => onDeleteUser(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]

  const [users, setUsers] = useState([])
  const fetchAllUsers = async () => {
    try {
      const res = await findAllUsers()
      setUsers(res)
    } catch (error) {
      console.log('🚀 ~ file: index.js:48 ~ fetchAllUsers ~ error:', error)
    }
  }

  const onDeleteUser = async (user) => {
    try {
      await deleteUser(user)
      message.success(`Delete ${user.username} success!`)
      fetchAllUsers()
    } catch (error) {}
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      delete values.confirm
      values.role = 'REVIEW'
      //   todo 修改
      const res = await createUser(values)
      message.success('Create success!')
      setIsModalOpen(false)
      fetchAllUsers()
    } catch (error) {
      console.log('🚀 ~ file: index.js:17 ~ onFinish ~ error:', error)
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)} className='mb-2'>
        Add Review User
      </Button>
      <Table columns={columns} dataSource={users} />
      <Modal title="Add Review User" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" form={form} name="register" style={{ maxWidth: 600 }} scrollToFirstError>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input Username' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input a E-mail!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input phone number!' }]}>
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input password!' }]} hasFeedback>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm the password!' },
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
            tooltip="What do you want others to call the user?"
            rules={[{ required: true, message: 'Please input nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Select placeholder="select gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="intro" label="Intro">
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default Admin
