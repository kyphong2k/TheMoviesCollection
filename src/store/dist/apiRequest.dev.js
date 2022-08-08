"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovieFromApi = void 0;

var _movieSlice = require("./movieSlice");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getMovieFromApi = function getMovieFromApi(dispatch, movieListData, searchKey) {
  var type, _ref, data, results, checkMovieList;

  return regeneratorRuntime.async(function getMovieFromApi$(_context) {
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
              query: searchKey
            }
          }));

        case 5:
          _ref = _context.sent;
          data = _ref.data;
          results = data.results;
          console.log(results);
          checkMovieList = movieListData.length > 1 ? true : false;

          if (!checkMovieList) {
            dispatch((0, _movieSlice.setMovieBannerList)(results.slice(0, 3)));
          }

          dispatch((0, _movieSlice.getSuccess)(results));
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          dispatch((0, _movieSlice.getError)());

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 14]]);
};

exports.getMovieFromApi = getMovieFromApi;