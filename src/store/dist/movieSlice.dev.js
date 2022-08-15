"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTotalPage = exports.LoadPageByNumber = exports.sortMovieList = exports.setSearchKey = exports.setMovieBannerList = exports.setSelectMovie = exports.setOpenModal = exports.getSuccess = exports.getError = exports.getStart = exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var movieSlice = (0, _toolkit.createSlice)({
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
    selectedMovie: ''
  },
  reducers: {
    getStart: function getStart(state) {
      state.pending = true;
      state.error = false;
    },
    getSuccess: function getSuccess(state, action) {
      state.movieList = _toConsumableArray(action.payload);
      state.pending = false;
      state.error = false;
      state.status = true;
    },
    getError: function getError(state) {
      state.pending = false;
      state.error = true;
    },
    setMovieBannerList: function setMovieBannerList(state, action) {
      state.movieBannerList = _toConsumableArray(action.payload);
    },
    setSearchKey: function setSearchKey(state, action) {
      state.searchKey = action.payload;
    },
    LoadPageByNumber: function LoadPageByNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setTotalPage: function setTotalPage(state, action) {
      state.totalPage = action.payload;
    },
    sortMovieList: function sortMovieList(state, action) {
      state.movieList = action.payload;
    },
    setOpenModal: function setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    setSelectMovie: function setSelectMovie(state, action) {
      state.selectedMovie = action.payload;
      state.pending = false;
      state.error = false;
      state.status = true;
    }
  }
});
var _default = movieSlice.reducer;
exports["default"] = _default;
var _movieSlice$actions = movieSlice.actions,
    getStart = _movieSlice$actions.getStart,
    getError = _movieSlice$actions.getError,
    getSuccess = _movieSlice$actions.getSuccess,
    setOpenModal = _movieSlice$actions.setOpenModal,
    setSelectMovie = _movieSlice$actions.setSelectMovie,
    setMovieBannerList = _movieSlice$actions.setMovieBannerList,
    setSearchKey = _movieSlice$actions.setSearchKey,
    sortMovieList = _movieSlice$actions.sortMovieList,
    LoadPageByNumber = _movieSlice$actions.LoadPageByNumber,
    setTotalPage = _movieSlice$actions.setTotalPage;
exports.setTotalPage = setTotalPage;
exports.LoadPageByNumber = LoadPageByNumber;
exports.sortMovieList = sortMovieList;
exports.setSearchKey = setSearchKey;
exports.setMovieBannerList = setMovieBannerList;
exports.setSelectMovie = setSelectMovie;
exports.setOpenModal = setOpenModal;
exports.getSuccess = getSuccess;
exports.getError = getError;
exports.getStart = getStart;