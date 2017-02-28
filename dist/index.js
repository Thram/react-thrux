"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _forEach = require("lodash/forEach");

var _forEach2 = _interopRequireDefault(_forEach);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _reduce = require("lodash/reduce");

var _reduce2 = _interopRequireDefault(_reduce);

var _isFunction = require("lodash/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _pick = require("lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _thrux = require("thrux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = exports.connect = function connect(stateKey, ReactComponent, map) {
  return _react2.default.createClass({
    observers: {},
    applyMap: function applyMap(res, value, key) {
      return map ? (0, _isFunction2.default)(map) ? (0, _assign2.default)(res, map(value)) : map[key] ? (0, _assign2.default)(res, map[key](value)) : res[key] = value : res[key] = value, res;
    },
    getInitialState: function getInitialState() {
      return (0, _assign2.default)(this.state || {}, (0, _reduce2.default)((0, _thrux.state)([].concat(stateKey)), this.applyMap, {}));
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      (0, _forEach2.default)([].concat(stateKey), function (key) {
        _this.observers[key] = function (stateValue) {
          var newState = _this.applyMap({}, stateValue, key);
          !(0, _isEqual2.default)((0, _pick2.default)(_this.state, (0, _keys2.default)(newState)), newState) && _this.setState(newState);
        };
        (0, _thrux.observe)(key, _this.observers[key]);
      });
    },
    componentWillUnmount: function componentWillUnmount() {
      (0, _forEach2.default)(this.observers, function (observer, key) {
        return (0, _thrux.removeObserver)(key, observer);
      });
      this.observers = {};
    },
    render: function render() {
      return _react2.default.createElement(ReactComponent, (0, _assign2.default)({}, this.props, this.state));
    }
  });
}; /**
    * Created by thram on 21/01/17.
    */