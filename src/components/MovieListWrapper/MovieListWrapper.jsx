import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { useSelector } from 'react-redux/es/exports'
const MovieListWrapper = () => {
    const movieListData = useSelector(state => state.movieData.movieList)
    const [movieList, setMovieList] = useState(movieListData)
    // useEffect(() => {
        
    // }, [movieListData])
  return (
    <div className='mt-3 mx-7 px-3 flex-row flex flex-wrap gap-5  max-w-[70%]'>
       {movieListData.length > 0 ? movieListData.map(movie => movie.poster_path != null ? <MovieCard key={movie.id} style={`flex-auto w-[23%]`} data= {movie}/>: ''): ''}
    </div>
  )
}

export default MovieListWrapper