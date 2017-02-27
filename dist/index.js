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

var _thrux = require("thrux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by thram on 21/01/17.
 */
var connect = exports.connect = function connect(stateKey, ReactComponent) {
  return _react2.default.createClass({
    observers: {},
    getInitialState: function getInitialState() {
      return (0, _assign2.default)(this.state || {}, (0, _thrux.state)([].concat(stateKey)));
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      (0, _forEach2.default)([].concat(stateKey), function (key) {
        _this.observers[key] = function (state) {
          var newState = {};
          newState[key] = state;
          _this.setState(newState);
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
};