import React from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, List, Space } from 'antd'
import { Link, NavLink } from 'react-router-dom'

const getAvatar = (i) => `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const ReviewList = ({ data }) => (
  <List
    itemLayout="vertical"
    size="large"
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        key={item._id}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
      >
        <div className="items-center space-x-4 md:flex">
          <img className="block object-cover h-40 mx-auto md:mx-0" alt="Poster" src={item.Poster} />
          <div>
            <List.Item.Meta
              avatar={<Avatar src={getAvatar(item._id)} />}
              title={<Link to={`/profile/${item.uid}`}>{item.username}</Link>}
              description={<NavLink to={`/details/${item.imdbID}`}>{item.movieTitle}</NavLink>}
            />
            {item.content}
          </div>
        </div>
      </List.Item>
    )}
  />
)
export default ReviewList
