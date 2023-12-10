import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Empty, Space, Flex, Statistic, Button, Descriptions, List } from 'antd'
import { HeartOutlined, StarOutlined, StarFilled } from '@ant-design/icons'

import { getMovieByImdbID } from '@/api/movie'

import { useReview } from '@/hooks/useReview'

const { Meta } = Card

function Details() {
  const params = useParams()
  const [movie, setMovie] = useState({})

  const fetchMovieDetails = async () => {
    const res = await getMovieByImdbID(params.imdbID)
    setMovie(res.data)
  }

  useEffect(() => {
    fetchMovieDetails()
  }, [params.imdbID])

  const { reviewContextHolder, handelReview } = useReview()

  const baseItems = useMemo(() => {
    const items = [
      {
        key: '1',
        label: 'Year',
        children: movie.Year,
      },
      {
        key: '2',
        label: 'Runtime',
        children: movie.Runtime,
      },
      {
        key: '3',
        label: 'Released',
        children: movie.Released,
      },
      {
        key: '4',
        label: 'Type',
        children: movie.Type,
      },
    ]
    return items
  }, [movie])

  const secondItems = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Genre',
        children: movie.Genre,
      },
      {
        key: '2',
        label: 'Language',
        children: movie.Language,
      },
      {
        key: '3',
        label: 'Country',
        children: movie.Country,
      },
      {
        key: '4',
        label: 'Rated',
        children: movie.Rated,
      },
      {
        key: '5',
        label: 'Awards',
        children: movie.Awards,
      },
    ]
  }, [movie])

  const thrItems = useMemo(() => {
    return [
      {
        key: 'Director',
        label: 'Director',
        children: movie.Director?.split(',') ?? [],
      },
      {
        key: 'Writer',
        label: 'Writer',
        children: movie.Writer?.split(',') ?? [],
      },
      {
        key: 'Actors',
        label: 'Actors',
        children: movie.Actors?.split(',') ?? [],
      },
    ]
  }, [movie])
  return (
    <div className="space-y-4 ">
      <div className="overflow-hidden bg-white shadow-md rounded-xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img className="object-cover w-full h-48 md:h-full md:w-48" alt="poster" src={movie.Poster} />
          </div>
          <div className="p-8">
            <Descriptions
              title={
                <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                  <Link to={`/details/${movie.imdbID}`}>{movie.Title}</Link>
                </div>
              }
              className="text-lg font-medium"
              column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
              items={baseItems}
            />
            <Descriptions className="text-lg font-medium" column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }} items={secondItems} />
            <p className="mt-2 text-slate-500">{movie.Plot}</p>
            <div className="justify-around mt-1 md:flex">
              <Button shape="circle" onClick={() => handelReview(movie)}>
                <StarOutlined />
              </Button>
              <Button shape="circle" onClick={() => handelReview(movie)}>
                <HeartOutlined key="watch" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Space size="large">
        <Statistic title="Imdb Rating" prefix={<StarFilled className="text-yellow-500 " />} value={movie.imdbRating} suffix="/10" />
        <Statistic title="Imdb Votes" value={movie.imdbVotes} />
        {movie.Ratings?.map((it) => (
          <Statistic title={it.Source} prefix={<StarFilled className="text-yellow-500 " />} value={it.Value} />
        ))}
      </Space>
      <Card bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
        <List
          dataSource={thrItems}
          renderItem={(item) => (
            <List.Item>
              <div className="space-x-4 text-lg">
                <span className="font-semibold">{item.label}</span>
                {item.children.map((ch) => (
                  <a key={ch}>{ch}</a>
                ))}
              </div>
            </List.Item>
          )}
        />
      </Card>

      {reviewContextHolder}
    </div>
  )
}

export default Details
