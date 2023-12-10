import React from 'react'
import { Space, Modal, Rate, Input } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { useUserContext } from '@/store/useUser'

import { createReview } from '@/api/review'
import './review.css'

export const useWatchList = () => {
  const navigate = useNavigate()
  const { userInfo } = useUserContext()

  let review = {}

  const onFinish = async () => {
    const res = await createReview(review)
    console.log('🚀 ~ file: useReview.js:17 ~ onFinish ~ res:', res)
  }

  const onRateChange = (rated) => {
    review = { ...review, rated }
  }

  const onContentChange = (e) => {
    review = { ...review, content: e.target.value }
  }

  const handelReview = (movie) => {
    review = {}
    if (userInfo) {
      review = { ...review, movie }
      Modal.confirm({
        className: 'text-center review-modal',
        title: movie.Title,
        icon: null,
        content: (
          <Space direction="vertical" style={{ display: 'flex' }}>
            <Rate onChange={onRateChange} />
            <Input.TextArea rows={4} placeholder="Please leave a comment" onChange={onContentChange} />
          </Space>
        ),
        onOk: onFinish,
      })
    } else {
      Modal.confirm({
        title: 'Do you Want to login in?',
        icon: <ExclamationCircleFilled />,
        content: (
          <div id="signin-perks">
            <h1>Benefits of your free IMDb account</h1>
            <p>
              <strong>Personalized Recommendations</strong>
              <br />
              Discover shows you'll love.
            </p>
            <p>
              <strong>Your Watchlist</strong>
              <br />
              Track everything you want to watch and receive e-mail when movies open in theaters.
            </p>
            <p>
              <strong>Your Ratings</strong>
              <br />
              Rate and remember everything you've seen.
            </p>
          </div>
        ),
        onOk() {
          navigate('/login')
        },
      })
    }
  }

  return { handelReview }
}
