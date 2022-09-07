import React from 'react'
import { useSelector} from 'react-redux'
import {setOpenModal} from '../../store/movieSlice'
import {getCastsFromMovie, getMovieById} from '../../store/apiRequest'
const MovieCard = ({style, data, dispatch}) => {
  const IMAGE_PATH ="https://image.tmdb.org/t/p/w500";
  const movieData = data
  const selectedMovie = useSelector(state => state.movieData.selectedMovie)

  const handleOpenDetail = async (movieId) => {
    await getMovieById(movieId, dispatch)
    await getCastsFromMovie(movieId, dispatch)
    if(selectedMovie !== undefined) {

      dispatch(setOpenModal(true))
    }
  }
  return (
     <div onClick={() => handleOpenDetail(movieData.id)} key= {movieData.id} className= {`${style} mb-9 max-w-[25%] hover:scale-110 hover:text-slate-700 transition duration-200 hover:ease-linear cursor-pointer`}>
        <img src={`${IMAGE_PATH}${movieData.poster_path}`} className='w-full h-full object-cover rounded' alt='movie Card' />
        <h5 className='text-center hover:text-bold movie-title'>{movieData.title}</h5>
    </div>
  )
}

export default MovieCard
