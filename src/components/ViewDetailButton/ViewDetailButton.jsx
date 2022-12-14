import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setOpenModal} from '../../store/movieSlice'
import {getCastsFromMovie, getMovieById} from '../../store/apiRequest'
const ViewDetailButton = (prop) => {
    const movieId = prop.movieId
    const selectedMovie = useSelector(state => state.movieData.selectedMovie)
    
    const dispatch = useDispatch()
    const clickOpenModal =  async() => {
       await getMovieById(movieId, dispatch)
       await getCastsFromMovie(movieId, dispatch)
        if(selectedMovie !== undefined) {

          dispatch(setOpenModal(true))
        }

    }
  return (
    <button onClick={clickOpenModal} className=' transition-all hover:ease-linear duration-300 flex items-center h-[38px] py-2 px-3 bg-slate-200 rounded hover:bg-slate-400 hover:text-yellow-300'>
        View Detail
    </button>
  )
}

export default ViewDetailButton