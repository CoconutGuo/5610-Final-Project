import React from 'react'
import { Card, Empty } from 'antd'
import { HeartOutlined, StarOutlined } from '@ant-design/icons'

import { useReview } from '@/hooks/useReview'
import { Link } from 'react-router-dom'

const { Meta } = Card

function MovieList({ movies }) {
  const { reviewContextHolder, handelReview } = useReview()
  if (!movies?.length) {
    return <Empty />
  }
  return (
    <div className='flex flex-wrap gap-2'>
      {movies.map((movie) => (
        <Card
          key={movie.imdbID}
          className="w-full md:w-auto "
          cover={<img className="object-contain md:object-cover h-96 md:h-80" alt="example" src={movie.Poster} />}
          actions={[<StarOutlined key="start" onClick={() => handelReview(movie)} />, <HeartOutlined key="watch" />]}
        >
          <Meta
            title={<Link to={`/details/${movie.imdbID}`}>{movie.Title}</Link>}
            description={
              <div className="flex justify-between min-w-[180px]">
                <span>
                  <label>Year:</label> {movie.Year}
                </span>
                <span>
                  <label>Type:</label> {movie.Type}
                </span>
              </div>
            }
          />
        </Card>
      ))}
      {reviewContextHolder}
    </div>
  )
}

export default MovieList
