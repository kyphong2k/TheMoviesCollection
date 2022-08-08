import { getStart, getError, getSuccess, setMovieBannerList, sortMovieList } from "./movieSlice";
import axios from "axios";


export const getMovieFromApi = async ( dispatch, movieListData, searchKey) => {
    const type = searchKey ? 'search' : 'discover'

    dispatch(getStart()) 
    try {

        const {data} = await axios.get(`http://api.themoviedb.org/3/${type}/movie`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                query: searchKey,
                
                
            }
        
        })
        const {results} = data
        console.log(results)
        const checkMovieList = movieListData.length > 1  ? true : false
        if(!checkMovieList) {
            dispatch(setMovieBannerList(results.slice(0,3)))
        }
        dispatch(getSuccess(results))

    }catch(err){
       dispatch(getError())
    }
}
