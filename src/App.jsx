import React, { useEffect, useState } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSlider from './components/BannerSlider/BannerSlider';
import FilterAndSearch from './components/FilterAndSearch/FilterAndSearch';
import {useSelector, useDispatch} from 'react-redux'
import {getMoviesFromApi, getMovieByGenre} from './store/apiRequest';
import MovieListWrapper from './components/MovieListWrapper/MovieListWrapper'
import Pagination from './components/Pagination/Pagination';
import Modal from './components/Modal/Modal';

const App = () => {
  
  
  const movieListBannerData = useSelector(state => state.movieData.movieBannerList)
  const pageNumber = useSelector(state => state.movieData.pageNumber)
  const [pageNum, setPageNum] = useState(pageNumber)
  const isOpenModal = useSelector(state=> state.movieData.openModal)
  const hadSortMovieList = useSelector(state => state.movieData.movieListAfterSort)
  const dispatch = useDispatch()
  const searchKey = useSelector(state => state.movieData.searchKey)
  const statusGetApi = useSelector(state => state.movieData.status)
  const [idGenre, setIdGenre] = useState('')
  useEffect(() => {
    if(hadSortMovieList.length > 2) {
      getMovieByGenre(idGenre, dispatch, pageNum)
    }else{
      getMoviesFromApi(dispatch, movieListBannerData, searchKey,pageNum, 'f')

    }
   
  }, [searchKey,pageNum, movieListBannerData,dispatch, idGenre])
  
 
  

  return (
    <div className="App " >
      <div id="appWrapper" className="w-full h-fit relative">

        <div id="title-app" className="text-center text-3xl text-yellow-100 py-3 bg-slate-900">
          <h1 onClick={() => {window.location.reload()}} className='text-3xl w-fit mr-auto ml-auto cursor-pointer hover:text-yellow-300'>The Movies Trailer</h1>
        </div>

        {movieListBannerData.length > 0 ? <BannerSlider /> : null }
        <FilterAndSearch  setPageNum={setPageNum} setIdGenre= {setIdGenre}/>
        
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
