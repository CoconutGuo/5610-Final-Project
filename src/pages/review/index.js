import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, message, Space, Table } from 'antd'
import { Link } from 'react-router-dom'

import { findPendingReviews, changeReviewStatus, deleteReview } from '@/api/review'

const Review = () => {
  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    {
      title: 'ImdbID',
      dataIndex: 'imdbID',
      key: 'imdbID',
      //   render: (text, record) => <Link to={`/search/${text}`}>{text}</Link>,
    },
    {
      title: 'Movie Title',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
      render: (text) => <Link to={`/search?criteria=${text}`}>{text}</Link>,
    },
    { title: 'Content', dataIndex: 'content', key: 'content' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => handelReviewStatus(record)}>
            Accept
          </Button>
          {/* <Popconfirm title="Reject the review?" description="Are you sure to reject this task?" onConfirm={() => confirmDelete(record)}>
            <Button danger>Reject</Button>
          </Popconfirm> */}
          <Button danger onClick={() => confirmDelete(record)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ]

  const [reviews, setReviews] = useState([])
  const fetchAllPendingReviews = async () => {
    try {
      const res = await findPendingReviews()
      setReviews(res)
    } catch (error) {
      console.log('🚀 ~ file: index.js:48 ~ fetchAllPendingReviews ~ error:', error)
    }
  }

  const handelReviewStatus = async (review, status = 'Public') => {
    try {
      const temp = { ...review, status }
      await changeReviewStatus(temp)
      message.success(`Change success!`)
      fetchAllPendingReviews()
    } catch (error) {
      console.log('🚀 ~ file: index.js:68 ~ handelReviewStatus ~ error:', error)
    }
  }

  // const confirmDelete = async (review) => {
  //   try {
  //     await handelReviewStatus(review, 'Conform')
  //   } catch (error) {}
  // }

  const confirmDelete = async (review) => {
    try {
      await deleteReview(review)
      message.success(`Delete ${review._id} success!`)
      fetchAllPendingReviews()
    } catch (error) {
      console.log('🚀 ~ file: index.js:68 ~ confirmDelete ~ error:', error)
    }
  }

  useEffect(() => {
    fetchAllPendingReviews()
  }, [])

  return <Table columns={columns} dataSource={reviews} />
}
export default Review
