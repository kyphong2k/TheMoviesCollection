import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {memo} from 'react'
import {getMoviesByType} from './getMoviesForSidebar'
import {FireIcon, CalendarIcon} from '@heroicons/react/solid'
import { useDispatch, useSelector} from 'react-redux'
import {setOpenModal} from '../../store/movieSlice'
import {getCastsFromMovie, getMovieById} from '../../store/apiRequest'

const SiderBar = () => {
    const [isActiveSideBar, setActiveSideBar] = useState('trending')
    const [movieList, setMovieList] = useState([])
    const dispatch = useDispatch()
    const getMovies = async (type) => {
        const data = await getMoviesByType(type)
        setMovieList(data)
    }
  const selectedMovie = useSelector(state => state.movieData.selectedMovie)
    
    const handleOpenDetail = async (movieId) => {
        await getMovieById(movieId, dispatch)
        await getCastsFromMovie(movieId, dispatch)
        if(selectedMovie !== undefined) {
    
          dispatch(setOpenModal(true))
        }
      }
    useEffect(() => {
        getMovies(isActiveSideBar)
    }, [isActiveSideBar])
  return (
    <div id='sideBarWrapper' className=' rounded h-full bg-red-700' >
        <div id='headerSideBar' className=" h-[52px] w-full flex text-yellow-100 bg-slate-900 ">
            <button onClick={() => setActiveSideBar('trending')} 
                className={`${isActiveSideBar === 'trending' ? 'bg-red-700 text-yellow-200 hover:text-yellow-200 ' : 'bg-slate-900 '}outline-none w-[50%] h-full hover:text-yellow-400 hover:cursor-pointer group transition-all
                 hover:ease-linear duration-300 text-lg font-bold py-3 `}>Trending
            </button>
            <button onClick={() => setActiveSideBar('latest')} 
                className={`${isActiveSideBar === 'latest' ? 'bg-red-700 text-yellow-200 hover:text-yellow-200 ' : 'bg-slate-900 '}outline-none w-[50%] h-full hover:text-yellow-400 hover:cursor-pointer group transition-all
                 hover:ease-linear duration-300 text-lg font-bold py-3`}>Latest
            </button>
        </div>
        <div id="mainSiderBar w-full" className='px-2 py-2'>
            <ul className='w-full h-fit flex flex-col gap-4'>
                {movieList.map((movie,idx) => {
                    return (
                        <li onClick={() => handleOpenDetail(movie.id)} key={movie.id} 
                            className={`${idx % 2 > 0 ? 'bg-red-500':'bg-red-600'} 
                            flex gap-3 rounded overflow-hidden group hover:cursor-pointer`}
                        >
                            <img src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} img`} className='group-hover:opacity-80' width='50px' height='50px'/>
                            <div className='flex flex-col w-full items-center justify-center text-yellow-200'>
                                <h5 className='text-center group-hover:text-yellow-400'>
                                    {movie.title}
                                </h5>
                                {isActiveSideBar === 'trending' 
                                    ? 
                                <h5 className='text-[12px] flex items-center text-center'>Hot <FireIcon className='h-3 ml-1 w-3 text-center inline-block text-yellow-600'/></h5> 
                                    : 
                                <h5 className='text-[12px] text-center flex items-center'><CalendarIcon className='h-3 w-3 mr-1 text-yellow-200 inline-block'/> {movie.release_date}</h5>}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
  )
}

export default memo(SiderBar)