import React, {useState} from 'react'
import { useSelector } from 'react-redux'
const Pagination = (props) => {
  const pageNum = props.pageNum
  const setPageNum = props.setPageNum
  const totalPage = useSelector(state => state.movieData.totalPage)
  const [enterPageNum, setEnterPageNum] = useState('')
  const handleSubmitPageNum = (e) => {
    e.preventDefault()
    if(isNaN(e.target.value)) {
      setPageNum(enterPageNum)
    }
  }
  return (
    <div id='pagiWrapper' className='flex items-center'>
      <button disabled={pageNum === 1} 
        className='mr-3 border-solid rounded-sm px-3 py-2  enabled:hover:bg-slate-700 bg-slate-400 disabled:opacity-75 ' 
        onClick={() => setPageNum(pageNum -1)}>Prev
      </button>
      <span className='mr-2'>{pageNum} of</span>
      <span className='mr-3'>{totalPage}</span>
      <button disabled={pageNum === totalPage && pageNum < 1} 
        className='mr-3 enabled:hover:bg-slate-700 border-solid rounded-sm px-3 py-2 bg-slate-400 disabled:opacity-75'
        onClick={() =>  setPageNum(pageNum + 1)}>Next
      </button>
      <form className='flex' onSubmit = {handleSubmitPageNum}>
        <input type='number' 
          className='outline-none py-2 px-3 rounded-sm w-[70px] bg-slate-300' 
          onChange = {(e) => setEnterPageNum(e.target.value)}
          placeholder={pageNum}
          min='1' max={totalPage}
          required
          />  
        <button type='submit'
          className='ml-3 hover:bg-slate-700 bg-slate-400   border-solid rounded-sm px-3 py-2 '>Go To Page
        </button>
      </form>
    </div>
  )
}

export default Pagination