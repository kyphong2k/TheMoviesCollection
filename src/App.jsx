import React, { useEffect, useState } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSlider from './components/BannerSlider/BannerSlider';
import FilterAndSearch from './components/FilterAndSearch/FilterAndSearch';
import { TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/solid';
import {useSelector, useDispatch} from 'react-redux'
import {getMovieFromApi} from './store/apiRequest';
import MovieListWrapper from './components/MovieListWrapper/MovieListWrapper'

const App = () => {
  
  const [filterType, setFilterType] = useState('popularity.desc')
  
  const movieListBannerData = useSelector(state => state.movieData.movieBannerList)
  const dispatch = useDispatch()
  const searchKey = useSelector(state => state.movieData.searchKey)
  useEffect(() => {
    getMovieFromApi(dispatch, movieListBannerData, searchKey)
   
  }, [searchKey])
  
 
  

  return (
    <div className="App">
      <div id="header" className="w-full h-fit">

        <div id="title-app" className="text-center text-3xl text-yellow-100 py-3 bg-slate-900">The Movies Trailer</div>

        <BannerSlider /> 
        <FilterAndSearch setFilterType={setFilterType}/>
        <span className='mx-7 mt-2 flex-row'>Sort By: {filterType} {filterType.includes('asc')
          ?
          <TrendingUpIcon className='w-4 h-4 inline-block'/>
          :
          <TrendingDownIcon className='w-5 h-5 inline-block'/>
          }
        </span>
        <MovieListWrapper />
      </div> 
    </div>
  );
  }


export default App;
