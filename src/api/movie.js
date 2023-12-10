import axios from 'axios'

const OMDB = 'https://www.omdbapi.com/?apikey=c60b8710&'

export const getMovieByImdbID = async (imdbID) => {
  return axios.get(`${OMDB}i=${imdbID}`)
}

export const getMoviesByTitle = async (title, page = 1) => {
  return axios.get(`${OMDB}s=${title}&page=${page}`)
}

  
