import {createSlice} from '@reduxjs/toolkit'

const movieSlice = createSlice({
    name: 'movieListState',
    initialState: {
        pending: false,
        error: false,
        status: false,
        movieList: [],
        movieBannerList: [],
        searchKey: '',
        pageNumber: 1,
        totalPage: 0,
        openModal: false,
        selectedMovie: '',
        videoLink: ''
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
        LoadPageByNumber: (state,action) => {
            state.pageNumber = action.payload
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        },
        sortMovieList: (state, action) => {
            state.movieList = action.payload
        },
        setOpenModal: (state, action) => {
            state.openModal = action.payload
        },
        setSelectMovie: (state,action) => {
            state.selectedMovie = action.payload
            state.pending = false;
            state.error = false;
            state.status = true
        },
        setVideoLink: (state, action) => {
            state.videoLink = action.payload
        }
    }
})

export default movieSlice.reducer;

export const {getStart, getError, getSuccess, setOpenModal, setSelectMovie, setVideoLink,
    setMovieBannerList, setSearchKey,sortMovieList,LoadPageByNumber, setTotalPage, } = movieSlice.actions