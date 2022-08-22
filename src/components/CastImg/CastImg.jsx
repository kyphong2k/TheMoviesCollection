import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { getImageLink } from '../../store/apiRequest'
const CastImg = ({id}) => {
    const linkImg = useSelector(state => state.movieData.castImgLinkList)
    console.log(linkImg)
    const dispatch = useDispatch()
    useEffect(() => {
        getImageLink(id, dispatch)
    }, [])
  return (
    <div className='w-full h-full'>
        {linkImg.length > 0 
            ? 
            <img src={`https://image.tmdb.org/t/p/original/${linkImg[0]}`} alt='cast img'/>
            : 
            null}
    </div>
  )
}

export default CastImg