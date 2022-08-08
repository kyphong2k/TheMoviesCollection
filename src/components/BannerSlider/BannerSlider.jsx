import React, {memo} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {useSelector} from 'react-redux'

const BannerSlider  = () => {
    const POSTER_WIDTH_FULL = "https://image.tmdb.org/t/p/original/"
    const movieList = useSelector(state => state.movieData.movieBannerList)
    const movieBannerList = movieList.slice(0,3)
    const settings = {
        infiniteLoop: true,
        autoPlay: true,
        interval: 5000,
        // centerMode: true,
        transitionTime: 2000,
        stopOnHover: false,
        showThumbs: false
      };
  return (
    <div id="banner" className=" h-[500px] bg-blue">
        <Carousel {...settings} className='h-full w-full max-h-full'>
        
                {movieBannerList.map(movie => {
                    return (
                          <div key={movie.id} className='w-full max-h-full h-[500]'>
                              <div className='w-full h-full max-h-full'>
                                <img className='w-full max-h-full object-cover' style={{height: '500px'}} src={`${POSTER_WIDTH_FULL}${movie.backdrop_path}`} alt="poster" /> 
                              </div>
                              <div className='banner-text absolute top-0 w-[550px] z-20 gap-8 h-full flex flex-col justify-center items-center '>
                                <h1 className='title-movie text-zinc-50 bold z-10'>{movie.original_title}</h1>
                                <p className='overview-movie text-zinc-50 max-w-[500px] z-10'>{movie.overview}</p> 
                              </div>
                          </div>
                    )
                })}
        </Carousel>
    </div>
  )
}

export default memo(BannerSlider)