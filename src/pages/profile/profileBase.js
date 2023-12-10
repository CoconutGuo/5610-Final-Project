import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { Card, Button, message, Descriptions, Modal, Space, List, Avatar } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

import ReviewList from '@/components/reviewList'

import { findUserById } from '@/api/login'
import { findReviewsByUid } from '@/api/review'
import { getFollowingById, setFollowingById, getFollowersByUid } from '@/api/follows'
import { useUserContext } from '@/store/useUser'

const cardBodyStyle = { paddingTop: 0, paddingBottom: 0 }

function Profile() {
  const { userInfo } = useUserContext()

  const [baseInfo, setBaseInfo] = useState({})

  const items = useMemo(() => {
    if (baseInfo) {
      return Object.keys(baseInfo).map((key) => ({
        key: key,
        label: key,
        children: baseInfo[key],
      }))
    } else {
      return []
    }
  }, [baseInfo])

  const navigate = useNavigate()
  const params = useParams()

  const getUserBaseInfo = async () => {
    const res = await findUserById(params.uid)
    setBaseInfo(res)
  }

  const [followingList, setFollowingList] = useState([])
  const fetchFollowings = async () => {
    const res = await getFollowingById(params.uid)
    if (res) {
      setFollowingList(res.following)
    } else {
      setFollowingList([])
    }
  }
  const [followers, setFollowers] = useState([])
  const fetchFollowers = async () => {
    const res = await getFollowersByUid(params.uid)
    setFollowers(res ?? [])
  }

  const [reviews, setReviews] = useState([])
  const fetchReviewsByUid = async () => {
    const res = await findReviewsByUid(params.uid)
    setReviews(res ?? [])
  }
  useEffect(() => {
    getUserBaseInfo()
    fetchFollowings()
    fetchFollowers()
    fetchReviewsByUid()
  }, [params.uid])

  const onFollowing = async () => {
    if (userInfo) {
      const res = await setFollowingById({ flowId: params.uid })
      message.success('Following Success!')
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

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card bordered>
        <Descriptions
          title="User Info"
          items={items}
          extra={
            userInfo?._id !== params.uid ? (
              <Button type="primary" onClick={onFollowing}>
                Following
              </Button>
            ) : null
          }
        />
      </Card>
      <Card bodyStyle={cardBodyStyle}>
        <List
          header={<div>Following</div>}
          itemLayout="horizontal"
          dataSource={followingList}
          bordered={false}
          renderItem={(item, index) => (
            <List.Item>
              {/* <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                title={<Link to={`/profile/${item._id}`}>{item.username}</Link>}
              /> */}
              <div className="flex items-center space-x-4 ">
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                <Link to={`/profile/${item._id}`}>{item.username}</Link>
              </div>
            </List.Item>
          )}
        />
      </Card>
      <Card bodyStyle={cardBodyStyle}>
        <List
          header={<div>Followers</div>}
          itemLayout="horizontal"
          dataSource={followers}
          bordered={false}
          renderItem={(item, index) => (
            <List.Item>
              <div className="flex items-center space-x-4 ">
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                <Link to={`/profile/${item.uid?._id}`}>{item.uid?.username}</Link>
              </div>
            </List.Item>
          )}
        />
      </Card>
      <Card bodyStyle={cardBodyStyle} title="Reviews">
        <ReviewList data={reviews} />
      </Card>
    </Space>
  )
}

export default Profile
