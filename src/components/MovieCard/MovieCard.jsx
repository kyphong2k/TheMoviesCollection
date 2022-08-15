import React from 'react'
import {useDispatch} from 'react-redux'
import {setOpenModal} from '../../store/movieSlice'
const MovieCard = ({style, data}) => {
  const IMAGE_PATH ="https://image.tmdb.org/t/p/w500";
  const movieData = data
  const dispatch = useDispatch()
  const handleOpenDetail = () => {
    dispatch(setOpenModal(true))
  }
  return (
     <div onClick={handleOpenDetail} key= {movieData.id} className= {`${style} mb-9 max-w-[25%] hover:scale-110 cursor-pointer`}>
        <img src={`${IMAGE_PATH}${movieData.poster_path}`} className='w-full h-full object-cover rounded' alt='movie Card' />
        <h5 className='text-center'>{movieData.title}</h5>
    </div>
  )
}

export default MovieCard