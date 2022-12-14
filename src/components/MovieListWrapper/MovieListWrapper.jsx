import React  from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { useDispatch, useSelector } from 'react-redux/es/exports'
const MovieListWrapper = () => {
    const movieListData = useSelector(state => state.movieData.movieList)
    const hadSortMovie = useSelector(state => state.movieData.movieListAfterSort)

    const dispatch = useDispatch()
  return (
    <div className='laptop:mt-3 phone:mt-5 mx-7 my-10 px-3 flex-row flex flex-wrap gap-5 max-w-[100%]'>
       {/* {movieListData.length > 0 ? movieListData.map(movie => movie.poster_path != null ? <MovieCard key={movie.id} style={`flex-auto w-[23%]`} data= {movie} dispatch={dispatch}/>: ''): ''} */}
       {hadSortMovie.length > 1 
          ?
        hadSortMovie.map(movie => movie.poster_path != null 
            ? <MovieCard key={movie.id} style={`laptop:flex-auto laptop:w-[23%] phone:flex-auto phone:w-[100%] ipad:w-[48%] ipad:flex-auto `} data= {movie} dispatch={dispatch}/>
            : '')
          : 
       movieListData.map(movie => movie.poster_path != null 
            ? <MovieCard key={movie.id} style={`laptop:flex-auto laptop:w-[23%] phone:flex-auto phone:w-[100%] ipad:w-[48%] ipad:flex-auto `} 
       data= {movie} dispatch={dispatch}/>
            : '')}
    </div>
  )
}

export default MovieListWrapper