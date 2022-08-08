import {createSlice} from '@reduxjs/toolkit'

const movieSlice = createSlice({
    name: 'movieListState',
    initialState: {
        pending: false,
        error: false,
        status: false,
        movieList: [],
        movieBannerList: [],
        searchKey: ''
    },
    reducers: {
        getStart: (state) => {
            state.pending = true;
            state.error = false
        },
        getSuccess: (state,action) => {
            state.movieList = [...action.payload];
            state.pending = false;
            state.error = false;
            state.status = true
        },
        
        getError: (state) => {
            state.pending = false;
            state.error = true
        },
        setMovieBannerList: (state,action) => {
            state.movieBannerList = [...action.payload]
        },
        setSearchKey: (state,action) => {
            state.searchKey = action.payload
        },
        sortMovieList: (state, action) => {
            state.movieList = action.payload
        }
    }
})

export default movieSlice.reducer;

export const {getStart, getError, getSuccess, setMovieBannerList, setSearchKey,sortMovieList} = movieSlice.actions