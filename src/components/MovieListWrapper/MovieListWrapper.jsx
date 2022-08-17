import React  from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { useDispatch, useSelector } from 'react-redux/es/exports'
const MovieListWrapper = () => {
    const movieListData = useSelector(state => state.movieData.movieList)
    // const [movieList, setMovieList] = useState(movieListData)
    const dispatch = useDispatch()
  return (
    <div className='mt-3 mx-7 my-10 px-3 flex-row flex flex-wrap gap-5 max-w-[70%]'>
       {movieListData.length > 0 ? movieListData.map(movie => movie.poster_path != null ? <MovieCard key={movie.id} style={`flex-auto w-[23%]`} data= {movie} dispatch={dispatch}/>: ''): ''}
    </div>
  )
}

export default MovieListWrapper