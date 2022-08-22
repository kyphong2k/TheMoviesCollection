import React from 'react'
import {useSelector} from 'react-redux'

const CastsInfo = () => {
  const castsList = useSelector(state => state.movieData.castList)
  const castsFivePeople = castsList.slice(0, 5)
  
  console.log(castsList)
  
  return (

      <ul className='flex flex-row w-[90%] gap-3'>

      {castsFivePeople.map((cast) => {
        return (
          <li id='castItem' key={cast.id} className='max-w-[190px]'>
            <div className='flex flex-col items-center'>
              <div className=' mt-3 w-[60px] h-[60px] rounded-[50%] bg-slate-200 overflow-hidden'>
                <img className='object-center' src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} alt="" />
              </div>
              <h4 id='castName' className='w-full text-center text-yellow-300 text-[13px]'>{cast.name}</h4>
              <h5 id='charName' className='text-yellow-200 opacity-75 text-[12px] text-center'>{cast.character}</h5>
            </div>
          </li>
        )
      })}
      </ul>
      
    
  )
}

export default CastsInfo