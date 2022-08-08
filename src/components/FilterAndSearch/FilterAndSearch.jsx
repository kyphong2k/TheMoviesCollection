import React, {  useState } from 'react'
import {FilterIcon, ChevronDownIcon, SearchIcon} from '@heroicons/react/solid'
import { useDispatch, useSelector} from 'react-redux';
import {setSearchKey,sortMovieList} from '../../store/movieSlice'
const FilterAndSearch = ({setFilterType}) => {
  const [searchKeyString, setSearchKeyString] = useState('');
  const dispatch = useDispatch()
  const movieList = useSelector(state => state.movieData.movieList);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    dispatch(setSearchKey(searchKeyString))
  }
  const handleFilter = (filterType) => {
    setFilterType(filterType)
    switch(filterType) {
      case ('popularity.desc'): {
        const dataAfterSort = [...movieList].sort((a,b) => {
          return b.popularity - a.popularity
          // reverse array desc
        })
        dispatch(sortMovieList(dataAfterSort))
        break;
      }
      case ('vote_average.desc'): {
        const dataAfterSort = [...movieList].sort((a,b) => {
          return b.vote_average - a.vote_average
          // reverse array desc
        })

        dispatch(sortMovieList(dataAfterSort))
        break;
      }
      case ('release_date.desc'): {
        const dataAfterSort = [...movieList].sort((a,b) => {
          const dateA = new Date(a.release_date)
          const dateB = new Date(b.release_date)
          return dateB - dateA
          // reverse array desc
        })

        dispatch(sortMovieList(dataAfterSort))
        break;
      }
      default: {
        // dispatch(sortMovieList(movieList))
      }
    }
  }
 
  return (
    <div className='pt-6 '>
        <div id="filter-and-search" className='mx-7 rounded bg-slate-900  max-w-[70%] flex-row flex gap-10 justify-between text-yellow-100'>
          <span className='ml-4 w-[10%] py-3'><FilterIcon className='w-5 h-5 inline-block'/> Filter By: </span>  
          <ul id='filter' className='w-[60%] h-full  pl-7 flex flex-row rounded gap-7 justify-center'>
            <li  onClick={() =>handleFilter('release_date.desc')} className='hover:cursor-pointer group inline-block  px-4 text-lg font-bold py-3 hover:bg-slate-400 relative'>
              New <ChevronDownIcon className='h-5 w-5 inline-block'/>
              
            </li>
            <li onClick={() =>handleFilter('vote_average.desc')} className='hover:cursor-pointer  group inline-block  px-4 text-lg font-bold py-3 hover:bg-slate-400 relative'>
              Vote <ChevronDownIcon className='h-5 w-5 inline-block'/>
              
            </li>
            <li  onClick={() =>handleFilter('popularity.desc')} className='hover:cursor-pointer group  inline-block  px-4 text-lg font-bold py-3 hover:bg-slate-400 relative'>
              Popular <ChevronDownIcon className='h-5 w-5 inline-block'/>
            </li>
          </ul>
          <form onSubmit={handleSubmit} id="search" className='w-[30%] flex items-center'>
              <input type='text' 
                placeholder='Enter keywords' 
                onChange = {(e) => setSearchKeyString(e.target.value)}
                className='px-3 flex items-center text-stone-800 outline-slate-700 rounded w-[80%]'/>
                
              <button type={'submit'} className='ml-1'><SearchIcon className='w-6 h-6 hover:ring-offset-sky-700'/></button>
          </form>
        </div>

    </div>
  )
}

export default FilterAndSearch