import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setOpenModal} from '../../store/movieSlice'
import YouTube from 'react-youtube'
import CastsInfo from '../CastsInfo/CastsInfo'
const Modal = () => {
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
    const dispatch = useDispatch()
    const movieSelected = useSelector(state => state.movieData.selectedMovie)
    const overview = useSelector(state => state.movieData.overview)
    const {key} = useSelector(state => state.movieData.videoLink)
    const hasMovie = typeof movieSelected === 'object' ? true : false
    const genreLength = movieSelected.genres.length
    const onPlayerReady = (event) => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }

    const closeModal = () => {
        dispatch(setOpenModal(false))
    }
    
  if(hasMovie){return (
     <div className='fixed w-[90%] left-[5%] h-[90%] top-[5%] bg-slate-700 z-1000 rounded flex flex-col'>
        <button onClick={closeModal} id='closeModal' className='absolute right-1 w-[38px] h-[30px] rounded text-[38px] flex items-center justify-center hover:text-yellow-300'>
           x
        </button>
        <div id='modalContent' className='absolute w-[96%] h-[90%] mt-10 flex left-[2%] right-[2%] gap-4'>
            <div id="videoFrame" className='flex-auto w-50 h-full'>
              <YouTube opts={{display: 'grid'}} videoId={`${key}`} onReady={onPlayerReady}/>
              <div id="casts">
                  <CastsInfo/>
              </div>
            </div>
            <div id="movieDetail" className=' flex-auto w-50 max-w-[50%] overflow-y-auto'>
                <div id="detailHeader" className='w-full flex flex-row gap-3'>
                  <div id="posterPath" className='flex-auto w-[30%] h-[250px]  '>
                    <img className='rounded' alt={`${movieSelected.title} img`} src={`${IMAGE_PATH}${movieSelected.poster_path}` } />
                  </div>
                  <div id="summary" className=' flex-auto flex flex-col justify-center w-[70%] text-yellow-100'>
                    <h1 id="titleMovie" className='text-yellow-100 text-3xl text-center w-[100%] mb-7'>{movieSelected.title}</h1>
                    <div>
                      <h3 className='w-[75px] inline-block opacity-80 text-[16px]' id='vote'>Vote: </h3>
                      <span >{movieSelected.vote_average} / 10</span>
                    </div>
                    <br></br>
                    <div>
                      <h3 className='w-[75px] inline-block opacity-80 text-[16px]' id="releaseDate">Release: </h3>
                      <span>{movieSelected.release_date}</span>
                    </div>
                    <ul id="tagList" className='flex flex-row flex-wrap items-center list-none'>
                      <h3 className='w-[75px] inline-block opacity-80 text-[16px]'>Tags: </h3>
                      {movieSelected.genres.map((genre,idx) => {
                        return (<li className='mr-2 ' key={genre.id}> {genre.name} {idx === genreLength -1 ? '.':','}  </li>)
                      })}
                    </ul>
                    <br></br>
                    
                  </div>
                </div>
                
                <div id="movieDesc" className='text-yellow-200  h-[100%]'><p className='indent-8 max-w-[100%]'>{overview}{overview}{overview}{overview}</p></div>
            </div>
        </div>
    </div>
  )}else{
    <div></div>
  }
}

export default Modal