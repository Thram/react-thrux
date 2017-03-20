'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _thrux = require('thrux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by thram on 21/01/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var connect = exports.connect = function connect(stateKey, ReactComponent, map) {
  return function (_Component) {
    _inherits(ThruxComponent, _Component);

    function ThruxComponent(props) {
      _classCallCheck(this, ThruxComponent);

      var _this = _possibleConstructorReturn(this, (ThruxComponent.__proto__ || Object.getPrototypeOf(ThruxComponent)).call(this, props));

      _this.componentDidMount = function () {
        (0, _forEach3.default)([].concat(stateKey), function (key) {
          _this.observers[key] = function (stateValue) {
            var newState = _this.applyMap({}, stateValue, key);
            if (!(0, _isEqual3.default)((0, _pick3.default)(_this.state, (0, _keys3.default)(newState)), newState)) _this.setState(newState);
          };
          (0, _thrux.observe)(key, _this.observers[key]);
        });
      };

      _this.componentWillUnmount = function () {
        (0, _forEach3.default)(_this.observers, function (observer, key) {
          return (0, _thrux.removeObserver)(key, observer);
        });
        _this.observers = {};
      };

      _this.applyMap = function (res, value, key) {
        var result = res;
        if (map) {
          if ((0, _isFunction3.default)(map)) {
            (0, _assign3.default)(result, map(value));
          } else if (map[key]) {
            (0, _assign3.default)(result, map[key](value));
          } else {
            result[key] = value;
          }
        } else {
          result[key] = value;
        }

        return result;
      };

      _this.render = function () {
        return _react2.default.createElement(ReactComponent, _extends({
          ref: function ref(component) {
            _this.wrapper = component;
          } }, _this.props, _this.state));
      };

      _this.observers = {};
      _this.state = (0, _assign3.default)({}, (0, _reduce3.default)((0, _thrux.state)([].concat(stateKey)), _this.applyMap, {}));
      return _this;
    }

    return ThruxComponent;
  }(_react.Component);
};

exports.default = { connect: connect };