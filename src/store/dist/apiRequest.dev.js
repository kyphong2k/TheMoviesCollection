"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovieById = exports.getMoviesFromApi = void 0;

var _movieSlice = require("./movieSlice");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getMoviesFromApi = function getMoviesFromApi(dispatch, movieListData, searchKey, pageNumber) {
  var type, _ref, data, results, total_pages, total_results, checkMovieList;

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
          total_pages = data.total_pages, total_results = data.total_results;
          console.log(total_pages + ' and results ' + total_results);
          console.log(results);
          checkMovieList = movieListData.length > 1 ? true : false;

          if (total_pages > 500) {
            dispatch((0, _movieSlice.setTotalPage)(500));
          } else if (total_pages <= 500) {
            dispatch((0, _movieSlice.setTotalPage)(total_pages));
          }

          if (!checkMovieList) {
            dispatch((0, _movieSlice.setMovieBannerList)(results.slice(0, 3)));
          }

          dispatch((0, _movieSlice.getSuccess)(results));
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          dispatch((0, _movieSlice.getError)());

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17]]);
};

exports.getMoviesFromApi = getMoviesFromApi;

var getMovieById = function getMovieById(id, dispatch) {
  var _ref2, data;

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
          console.log(data);
          dispatch((0, _movieSlice.setSelectMovie)(data));
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          dispatch((0, _movieSlice.getError)());

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.getMovieById = getMovieById;