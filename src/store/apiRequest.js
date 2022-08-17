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
        const {total_pages} = data
        
        const checkMovieList = movieListData.length > 1  ? true : false
        if(total_pages>500){

            dispatch(setTotalPage(500))
        }else if(total_pages <= 500){
            dispatch(setTotalPage(total_pages))
        }

        if(!checkMovieList) {
            const bannerList = results.slice(0,5)
            console.log(bannerList)
            dispatch(setMovieBannerList(bannerList))
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
        if(results.length > 0) {

            const officialTrailer = results.filter(result => {
                return result.name.includes('Trailer')
            })
            if(officialTrailer.length > 0) {
                officialTrailer.sort((a,b) => {
                    return a.name.length - b.name.length
                    //because object have some name 'official trailer ['1','2']' 
                    //so i just want to take offcial trailer
                    
                 })
                console.log(officialTrailer)
    
                dispatch(setVideoLink(officialTrailer[0]))
                // take the items
            }else{
                
                dispatch(setVideoLink(results[0]))
            }
            dispatch(setSelectMovie(data))

        }else {
            // i don't know what happen if it have error in here ^^. wait me reasearch more
        }
        
        
        


    }catch(err) {
        dispatch(getError())
    }
}
