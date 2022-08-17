"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovieById = exports.getMoviesFromApi = void 0;

var _movieSlice = require("./movieSlice");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getMoviesFromApi = function getMoviesFromApi(dispatch, movieListData, searchKey, pageNumber) {
  var type, _ref, data, results, total_pages, checkMovieList, bannerList;

  return regeneratorRuntime.async(function getMoviesFromApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          type = searchKey ? 'search' : 'discover';
          dispatch((0, _movieSlice.getStart)());
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].get("http://api.themoviedb.org/3/".concat(type, "/movie"), {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              query: searchKey,
              page: pageNumber
            }
          }));

        case 5:
          _ref = _context.sent;
          data = _ref.data;
          results = data.results;
          total_pages = data.total_pages;
          checkMovieList = movieListData.length > 1 ? true : false;

          if (total_pages > 500) {
            dispatch((0, _movieSlice.setTotalPage)(500));
          } else if (total_pages <= 500) {
            dispatch((0, _movieSlice.setTotalPage)(total_pages));
          }

          if (!checkMovieList) {
            bannerList = results.slice(0, 5);
            console.log(bannerList);
            dispatch((0, _movieSlice.setMovieBannerList)(bannerList));
          }

          dispatch((0, _movieSlice.getSuccess)(results));
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          dispatch((0, _movieSlice.getError)());

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 15]]);
};

exports.getMoviesFromApi = getMoviesFromApi;

var getMovieById = function getMovieById(id, dispatch) {
  var _ref2, data, results, officialTrailer;

  return regeneratorRuntime.async(function getMovieById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dispatch((0, _movieSlice.getStart)());
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("https://api.themoviedb.org/3/movie/".concat(id), {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              append_to_response: 'videos'
            }
          }));

        case 4:
          _ref2 = _context2.sent;
          data = _ref2.data;
          // console.log(data)
          results = data.videos.results;
          console.log(results);

          if (results.length > 0) {
            officialTrailer = results.filter(function (result) {
              return result.name.includes('Trailer');
            });

            if (officialTrailer.length > 0) {
              officialTrailer.sort(function (a, b) {
                return a.name.length - b.name.length; //because object have some name 'official trailer ['1','2']' 
                //so i just want to take offcial trailer
              });
              console.log(officialTrailer);
              dispatch((0, _movieSlice.setVideoLink)(officialTrailer[0])); // take the items
            } else {
              dispatch((0, _movieSlice.setVideoLink)(results[0]));
            }

            dispatch((0, _movieSlice.setSelectMovie)(data));
          } else {// i don't know what happen if it have error in here ^^. wait me reasearch more
          }

          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          dispatch((0, _movieSlice.getError)());

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

exports.getMovieById = getMovieById;