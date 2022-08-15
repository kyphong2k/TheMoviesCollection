import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setOpenModal} from '../../store/movieSlice'
import './Modal.css'
const Modal = () => {
    const dispatch = useDispatch()
    const movieSelected = useSelector(state => state.movieData.selectedMovie)
    const hasMovie = typeof movieSelected ==='object' ? true : false
    const closeModal = () => {
        dispatch(setOpenModal(false))
    }
    
  if(hasMovie){return (
     <div className='fixed w-[90%] left-[5%] h-[90%] top-[5%] bg-slate-700 z-1000 rounded flex flex-col'>
        <button onClick={closeModal} id='closeModal' className='absolute right-1 w-[38px] h-[30px] rounded text-[38px] flex items-center justify-center hover:text-yellow-300'>
           x
        </button>
        <div id='modalContent' className='absolute w-[96%] h-[90%] mt-10 flex left-[2%] right-[2%] gap-6'>
            <div id="videoFrame" className='flex-auto w-50 bg-slate-400'></div>
            <div id="movieDetail" className='flex-auto w-50 max-w-[50%] overflow-y-auto'>
                <div id="detailHeader" className='w-full flex flex-row gap-3'>
                  <div id="posterPath" className='flex-auto w-[30%] h-[250px] bg-slate-300'>

                  </div>
                  <div id="summary" className='flex-auto w-[70%] text-yellow-100'>
                    <h1 id="titleMovie" className='text-yellow-100 text-center w-[100%] mb-7'>{movieSelected.original_title}</h1>
                    <h3 className='w-[75px] inline-block' id='vote'>Vote: </h3>
                    <span >{movieSelected.vote_average}</span>
                    <br></br>
                    <h3 className='w-[75px] inline-block' id="releaseDate">Release: </h3>
                    <span>{movieSelected.release_date}</span>
                    <ul id="tagList" className='flex flex-row items-center list-none'>
                      <h3 className='w-[75px] inline-block'>Tags: </h3>
                      {movieSelected.genres.map(genre => {
                        return (<li className='mr-2 ' key={genre.id}> {genre.name} </li>)
                      })}
                    </ul>
                    <br></br>

                  </div>
                </div>
                <div id="casts"></div>
                <div id="movieDesc"></div>
            </div>
        </div>
    </div>
  )}else{
    <div></div>
  }
}

export default Modal