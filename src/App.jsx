import React, { useEffect, useState } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSlider from './components/BannerSlider/BannerSlider';
import FilterAndSearch from './components/FilterAndSearch/FilterAndSearch';
import { TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/solid';
import {useSelector, useDispatch} from 'react-redux'
import {getMoviesFromApi} from './store/apiRequest';
import MovieListWrapper from './components/MovieListWrapper/MovieListWrapper'
import Pagination from './components/Pagination/Pagination';
import Modal from './components/Modal/Modal';

const App = () => {
  
  const [filterType, setFilterType] = useState('popularity.desc')
  
  const movieListBannerData = useSelector(state => state.movieData.movieBannerList)
  const pageNumber = useSelector(state => state.movieData.pageNumber)
  const [pageNum, setPageNum] = useState(pageNumber)
  const [titleFilter, setTitleFilter] = useState('Popular')
  const isOpenModal = useSelector(state=> state.movieData.openModal)
  
  const dispatch = useDispatch()
  const searchKey = useSelector(state => state.movieData.searchKey)
  const statusGetApi = useSelector(state => state.movieData.status)
  useEffect(() => {
    getMoviesFromApi(dispatch, movieListBannerData, searchKey,pageNum)
   
  }, [searchKey,pageNum])
  
 
  

  return (
    <div className="App " >
      <div id="appWrapper" className="w-full h-fit relative">

        <div id="title-app" className="text-center text-3xl text-yellow-100 py-3 bg-slate-900">The Movies Trailer</div>

        {movieListBannerData.length > 0 ? <BannerSlider /> : null }
        <FilterAndSearch setFilterType={setFilterType} setPageNum={setPageNum} setTitleType={setTitleFilter}/>
        <span id='sortTitle' className='mx-7 mt-2 flex-row'>Sort By: {filterType} {filterType.includes('asc')
          ?
          <TrendingUpIcon className='w-4 h-4 inline-block'/>
          :
          <TrendingDownIcon className='w-5 h-5 inline-block'/>
          }
        </span>
        {statusGetApi ? <MovieListWrapper />: null}
        <div className='mt-[20px] mx-7 max-w-[70%] flex justify-center'>
          <Pagination pageNum={pageNum} setPageNum={setPageNum}/>
        </div>
        { isOpenModal 
          ? 
          <Modal/>
          : 
          null
        }
      </div> 
    </div>
  );
  }


export default App;
