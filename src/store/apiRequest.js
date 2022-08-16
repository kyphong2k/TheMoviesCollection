import { getStart, getError, getSuccess, setMovieBannerList, setTotalPage, setSelectMovie, setVideoLink} from "./movieSlice";
import axios from "axios";


export const getMoviesFromApi = async ( dispatch, movieListData, searchKey,pageNumber) => {
    const type = searchKey ? 'search' : 'discover'

    dispatch(getStart()) 
    try {

        const {data} = await axios.get(`http://api.themoviedb.org/3/${type}/movie`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                query: searchKey,
                page: pageNumber
                
            }
        
        })
        const {results} = data
        const {total_pages, total_results} = data
        
        const checkMovieList = movieListData.length > 1  ? true : false
        if(total_pages>500){

            dispatch(setTotalPage(500))
        }else if(total_pages <= 500){
            dispatch(setTotalPage(total_pages))
        }

        if(!checkMovieList) {
            dispatch(setMovieBannerList(results.slice(0,3)))
        }
        dispatch(getSuccess(results))

    }catch(err){
       dispatch(getError())
    }
}

export const getMovieById = async (id, dispatch) => {
    
    dispatch(getStart())
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}`,{
        params: {
            api_key: process.env.REACT_APP_API_KEY,
            append_to_response: 'videos'
            
        }})
        // console.log(data)
        const {results} = data.videos
        console.log(results)
        const officialTrailer = results.find(result => {
            return result.name.includes('Official Trailer')
        })
        
        
        if(officialTrailer !== undefined) {
            // officialTrailer.sort((a,b) => {
            //     return a.name.length - b.name.length
            //  })
            console.log(officialTrailer)

            dispatch(setVideoLink(officialTrailer))
        }else{
            const trailer = results[0]
            console.log()
            dispatch(setVideoLink(trailer))
        }
        

        dispatch(setSelectMovie(data))

    }catch(err) {
        dispatch(getError())
    }
}
