import React, { useState, useEffect } from 'react'
import { Card, Pagination, Typography, Button, Empty } from 'antd'
import { generate } from 'random-words'
import { Link } from 'react-router-dom'
import ReviewList from '@/components/reviewList'
import MovieList from '@/components/movieList'

import { useUserContext } from '@/store/useUser'
import EmptySvg from '@/assets/empty.svg'
import { getMoviesByTitle } from '@/api/movie'
import { getLatestReviews } from '@/api/review'

import './home.css'

const { Meta } = Card
const { Title } = Typography

function HomeIndex() {
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [current, setCurrent] = useState(1)
  const [title, setTitle] = useState('')
  const { userInfo } = useUserContext()

  const [userWatchlist, setUserWatchlist] = useState([])
  const [reviews, setReviews] = useState([])

  const getRandomMovies = async (title, page = 1) => {
    const res = await getMoviesByTitle(title, page)
    setMovies(res.data.Search)
    setTotalResults(res.data.totalResults)
  }

  useEffect(() => {
    const t = generate()
    setTitle(t)
    getRandomMovies(t)
  }, [])

  const onChange = (page) => {
    setCurrent(page)
    getRandomMovies(title, page)
  }

  const fetchLatestReviews = async () => {
    try {
      const res = await getLatestReviews()
      setReviews(res)
    } catch (error) {
      console.log('🚀 ~ file: index.js:48 ~ getLatestReviews ~ error:', error)
    }
  }

  useEffect(() => {
    fetchLatestReviews()
  }, [])

  return (
    <main>
      <section>
        <Title level={3} className="!text-yellow-600 ipc-title__text">
          What to watch
        </Title>
        <MovieList movies={movies} />
        {userInfo ? (
          <Pagination className="mt-2 text-center" current={current} onChange={onChange} total={totalResults} showSizeChanger={false} hideOnSinglePage/>
        ) : null}
      </section>

      <section className="mt-4">
        <Title level={3} className="!text-yellow-600 ipc-title__text">
          From your Watchlist
        </Title>
        <Card className="text-center">
          {userInfo ? (
            userWatchlist.length ? (
              userWatchlist.map((movie) => (
                <Card key={movie.imdbID} className="w-52" cover={<img className="w-52 h-60" alt="example" src={movie.Poster} />}>
                  <Meta
                    title={movie.Title}
                    description={
                      <div className="flex justify-between">
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
              ))
            ) : (
              <Empty image={EmptySvg} imageStyle={{ display: 'inline', height: 60 }} description={<span>No Watchlist</span>} />
            )
          ) : (
            <>
              <p className="text-lg font-medium">Sign in to access your Watchlist</p>
              <p className="text-lg font-medium">Save shows and movies to keep track of what you want to watch.</p>
              <Button className="mt-2">
                <Link to="/login">Sign In to OMDB</Link>
              </Button>
            </>
          )}
        </Card>
      </section>
      <section className="mt-4">
        <Title level={3} className="!text-yellow-600 ipc-title__text">
          Most recent post
        </Title>
        <Card>
          <ReviewList data={reviews} />
        </Card>
      </section>
    </main>
  )
}

export default HomeIndex
