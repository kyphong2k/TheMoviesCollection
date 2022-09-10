import React, { useEffect, useState } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "react-scroll-to-top"; 
import BannerSlider from './components/BannerSlider/BannerSlider';
import FilterAndSearch from './components/FilterAndSearch/FilterAndSearch';
import {ChevronUpIcon, FilmIcon} from '@heroicons/react/solid'
import {useSelector, useDispatch} from 'react-redux'
import {getMoviesFromApi, getMovieAfterSort} from './store/apiRequest';
import MovieListWrapper from './components/MovieListWrapper/MovieListWrapper'
import Pagination from './components/Pagination/Pagination';
import Modal from './components/Modal/Modal';
import SiderBar from './components/SideBar/SiderBar';

const App = () => {
  
  
  const movieListBannerData = useSelector(state => state.movieData.movieBannerList)
  const pageNumber = useSelector(state => state.movieData.pageNumber)
  const [pageNum, setPageNum] = useState(pageNumber)
  const isOpenModal = useSelector(state=> state.movieData.openModal)
  const hadSortMovieList = useSelector(state => state.movieData.movieListAfterSort)
  const dispatch = useDispatch()
  const searchKey = useSelector(state => state.movieData.searchKey)
  const statusGetApi = useSelector(state => state.movieData.status)

  // state of sort method
  const [idGenre, setIdGenre] = useState('')
  const [year, setYear] = useState('')
  const [typeSort , setTypeSort] = useState('')

  const getMoviesFromTheMovie = async (searchKey,pageNum, idGenre, year, typeSort,hadSortMovieList,dispatch,movieListBannerData) => {
    if(hadSortMovieList.length > 2) {
      if(typeSort === 'genre') {

        await getMovieAfterSort(idGenre, dispatch, pageNum, typeSort)
      }
      else if (typeSort === 'year') {
        await getMovieAfterSort(year, dispatch, pageNum, typeSort)
        
      }
    }else{
      await getMoviesFromApi(dispatch, movieListBannerData, searchKey,pageNum)

    }
  }
  useEffect(() => {
    // if(hadSortMovieList.length > 2) {
    //   if(typeSort === 'genre') {

    //     getMovieAfterSort(idGenre, dispatch, pageNum, typeSort)
    //   }
    //   else if (typeSort === 'year') {
    //     getMovieAfterSort(year, dispatch, pageNum, typeSort)
        
    //   }
    // }else{
    //   getMoviesFromApi(dispatch, movieListBannerData, searchKey,pageNum)

    // }
    getMoviesFromTheMovie(searchKey,pageNum, idGenre, year, typeSort,hadSortMovieList,dispatch,movieListBannerData)
  }, [searchKey,pageNum, idGenre, year, typeSort,hadSortMovieList,movieListBannerData,dispatch])
  
 
  

  return (
    <div className={`App phone:overflow-x-hidden phone:overflow-y-hidden`} >
      <div id="appWrapper" className={`${isOpenModal ? 'overflow-y-hidden ' : ''} overflow-x-hidden overflow-hidden justify-center flex-col flex`}>
        {/* header */}
        <div id="title-app" className="text-center text-3xl text-yellow-100 py-3 bg-slate-900">
          <h1 onClick={() => {window.location.reload()}} 
            className='text-3xl w-fit mr-auto ml-auto cursor-pointer hover:text-yellow-300 flex items-center'>
            The Movies Collection <FilmIcon className=' max-w-[300px] max-h-[300px]  inline-block hover: text-yellow-300'/>
          </h1>
        </div>
        {/* banner */}
        {movieListBannerData.length > 0 ? <BannerSlider /> : null }
        {/* body area */}
        <div className='w-full h-full flex flex-wrap laptop:flex-nowrap body-wrapper'>
          <div className='ipad:w-[100%] laptop:w-[70%] phone:w-[100%] flex flex-col'>
            <FilterAndSearch  setPageNum={setPageNum} setIdGenre= {setIdGenre} setYear= {setYear} setTypeSort={setTypeSort}/>
            
            {statusGetApi ? <MovieListWrapper />: null}
            <div className='mt-[20px] mx-7 max-w-[100%] flex flex-wrap justify-center'>
              <Pagination pageNum={pageNum} setPageNum={setPageNum}/>
            </div>
          </div>
        {/* side bar */}
          <div className='laptop:w-[30%]  phone:w-[100%] phone:mx-2 block laptop:mr-7 mt-[25px] h-fit bg-red-700 rounded'>
            <SiderBar/>
          </div>
        </div>
        {/* footer */}
        <div id='footer' className='h-[200px] phone:hidden laptop:block w-full bg-slate-800 mt-14'>

        </div>
        {/* button scroll on top */}
      
        <ScrollToTop top={509} width={50} heigth={50} smooth component={<ChevronUpIcon className='text-yellow-100 hover:text-yellow-400 duration-300'/>} style={{background: 'gray'}}  />
        
        
      </div> 
      { isOpenModal 
          ? 
           <Modal/>
          : 
          null
      }
    </div>
  );
  }


export default App;
