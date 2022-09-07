"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMoviesByType = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getMoviesByType = function getMoviesByType(type) {
  var _ref, data, results, _ref2, _data, _results;

  return regeneratorRuntime.async(function getMoviesByType$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(type === 'trending')) {
            _context.next = 12;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("https://api.themoviedb.org/3/trending/movie/week", {
            params: {
              api_key: process.env.REACT_APP_API_KEY
            }
          }));

        case 4:
          _ref = _context.sent;
          data = _ref.data;
          results = data.results;
          results.sort(function (a, b) {
            return b.vote_average - a.vote_average;
          });
          console.log(results);
          return _context.abrupt("return", results.slice(0, 10));

        case 12:
          if (!(type === 'latest')) {
            _context.next = 21;
            break;
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(_axios["default"].get("https://api.themoviedb.org/3/movie/upcoming", {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              language: 'en-US',
              page: 1
            }
          }));

        case 15:
          _ref2 = _context.sent;
          _data = _ref2.data;
          _results = _data.results;

          _results.sort(function (a, b) {
            return new Date(b.release_date) - new Date(a.release_date);
          });

          console.log(_results);
          return _context.abrupt("return", _results.slice(0, 10));

        case 21:
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

exports.getMoviesByType = getMoviesByType;