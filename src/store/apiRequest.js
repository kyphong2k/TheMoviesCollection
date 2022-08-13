import { getStart, getError, getSuccess, setMovieBannerList, setTotalPage} from "./movieSlice";
import axios from "axios";


export const getMovieFromApi = async ( dispatch, movieListData, searchKey,pageNumber) => {
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
        console.log(total_pages + ' and results ' + total_results)
        console.log(results)
        const checkMovieList = movieListData.length > 1  ? true : false
        dispatch(setTotalPage(total_pages))
        if(!checkMovieList) {
            dispatch(setMovieBannerList(results.slice(0,3)))
        }
        dispatch(getSuccess(results))

    }catch(err){
       dispatch(getError())
    }
}
