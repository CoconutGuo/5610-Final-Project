import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieList from '@/components/movieList'

import { getMoviesByTitle } from '@/api/movie'
import { message, Pagination } from 'antd'

function Search() {
  let [searchParams] = useSearchParams()
  let paramValue = searchParams.get('criteria')
  let value = React.useMemo(() => decodeURI(paramValue), [paramValue])

  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [current, setCurrent] = useState(1)

  const getRandomMovies = async (title, page = 1) => {
    const res = await getMoviesByTitle(title, page)
    setCurrent(page)
    if (res.data.Search) {
      setMovies(res.data.Search)
      setTotalResults(res.data.totalResults)
    } else {
      message.error(res.data.Error)
    }
  }

  useEffect(() => {
    if (value && value != 'null') {
      getRandomMovies(value)
    }
    console.log('🚀 ~ file: index.js:34 ~ Search ~ value:', Boolean(value))
  }, [value])

  const onChange = (page) => {
    getRandomMovies(value, page)
  }
  
  return (
    <>
      <MovieList movies={movies} />
      <Pagination className="mt-2 text-center" hideOnSinglePage current={current} onChange={onChange} total={totalResults} showSizeChanger={false}  />
    </>
  )
}

export default Search
