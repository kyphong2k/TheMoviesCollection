import React, {  useState } from 'react'
import {FilterIcon, ChevronDownIcon, SearchIcon} from '@heroicons/react/solid'
import { useDispatch, useSelector} from 'react-redux';
import {setSearchKey} from '../../store/movieSlice'
import { getMovieByGenre } from '../../store/apiRequest';
const FilterAndSearch = ({ setPageNum, setIdGenre}) => {
  const [searchKeyString, setSearchKeyString] = useState('');
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  // const hadSortMovieList = useSelector(state => state.movieData.movieListAfterSort)

  const genreList = [
    {id: 28,name:'Action'},
    {id: 12,name:'Adventure'},
    {id: 16,name:'Animation'},
    {id: 35,name:'Comedy'},
    {id: 80,name:'Crime'},
    {id: 99,name:'Documentary'},
    {id: 18,name:'Drama'},
    {id: 10751,name:'Family'},
    {id: 14,name:'Fantasy'},
    {id: 36,name:'History'},
    {id: 27,name:'Horror'},
    {id: 10402,name:'Music'},
    {id: 9648,name:'Mystery'},
    {id: 10749,name:'Romance'},
    {id: 878,name:'Science Fiction'},
    {id: 10770,name:'TV Movie'},
    {id: 53,name:'Thriller'},
    {id: 10752,name:'War'},
    {id: 37,name:'Western'}
  ]
  const handleSubmit = (e) => {
    e.preventDefault()
    setPageNum(1)
    dispatch(setSearchKey(searchKeyString))
  }
  
  const handleSortByGenre = async (id) => {
    await getMovieByGenre(id, dispatch, 1)
    setIsActive(id)
    setPageNum(1)
    setIdGenre(id)

  }
 
  return (
    <div className='pt-6 '>
        <div id="filter-and-search" className='mx-7 rounded bg-slate-900  max-w-[70%] flex-row flex gap-10 justify-between text-yellow-100'>
          <span className='ml-4 w-[10%] py-3'><FilterIcon className='w-5 h-5 flex flex-nowrap'/></span>  
          <ul id='filter' className='w-[60%] h-full  pl-7 flex flex-row rounded gap-7 justify-center'>
            <li   className='hover:cursor-pointer group transition-all hover:ease-linear duration-300  inline-block  px-4 text-lg font-bold py-3 hover:bg-slate-400 relative'>
              Genres <ChevronDownIcon className='h-5 w-5 inline-block'/>
              <ul 
                className='absolute py-2 px-2 top-[100%] left-0 min-h-[80px] min-w-[700px] w-fit group-hover:grid grid-cols-5 gap-2 bg-red-700 hidden'
              >
                {genreList.map(genre => {
                  return (<li key={genre.id} onClick={() => handleSortByGenre(genre.id)} 
                    className= {`${isActive === genre.id ? 'cursor-not-allowed bg-violet-700 text-yellow-300 hover:bg-violet-700' : ''}hover:text-yellow-300 ml-3 hover:bg-slate-500 py-3 min-w-[100px] px-4 w-fit flex items-center justify-center max-h-[52px]`}
                    >
                    {genre.name}
                  </li>)
                })}
              </ul>
            </li>
            <li  className='hover:cursor-pointer transition-all hover:ease-linear duration-300   group inline-block  px-4 text-lg font-bold py-3 hover:bg-slate-400 relative'>
              Country <ChevronDownIcon className='h-5 w-5 inline-block'/>
              
            </li>
            <li   className='hover:cursor-pointer transition-all hover:ease-linear duration-300  group  inline-block  px-4 text-lg font-bold py-3 hover:bg-slate-400 relative'>
              Year <ChevronDownIcon className='h-5 w-5 inline-block'/>
            </li>
          </ul>
          <form onSubmit={handleSubmit} id="search" className='w-[30%] flex items-center justify-center'>
              <input type='text' 
                placeholder='Enter keywords' 
                onChange = {(e) => setSearchKeyString(e.target.value)}
                className='px-3 flex items-center w-[140px] text-stone-800 outline-slate-700 rounded'/>
                
              <button type={'submit'} className='ml-1'><SearchIcon className='w-6 h-6 hover:ring-offset-sky-700'/></button>
          </form>
        </div>

    </div>
  )
}

export default FilterAndSearch