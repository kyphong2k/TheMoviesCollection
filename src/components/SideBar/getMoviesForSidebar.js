import axios from 'axios'
export const getMoviesByType = async (type) => {
    try {
        if(type === 'trending') {

            const {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, 
                {
                    params: {
                        api_key : process.env.REACT_APP_API_KEY,
                    }
                })
                const {results} = data
                results.sort((a,b) => {
                    return b.vote_average - a.vote_average
                })
                console.log(results)
                return results.slice(0, 10)
        }
        else if(type === 'latest') {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/upcoming`, {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    language: 'en-US',
                    page: 1,
                }
            })
            const {results} = data
                results.sort((a,b) => {
                    return new Date(b.release_date) - new Date(a.release_date)
                })
                console.log(results)
            return results.slice(0,10)
        }
    }
    catch(err) {
        console.log(err)
    }
}