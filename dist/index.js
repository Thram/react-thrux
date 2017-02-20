"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _forEach = require("lodash/forEach");

var _forEach2 = _interopRequireDefault(_forEach);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _isArray = require("lodash/isArray");

var _isArray2 = _interopRequireDefault(_isArray);

var _thrux = require("thrux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by thram on 21/01/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var connect = exports.connect = function connect(stateKey, ReactComponent) {
  var ThruxComponent = function (_ReactComponent) {
    _inherits(ThruxComponent, _ReactComponent);

    function ThruxComponent(props) {
      _classCallCheck(this, ThruxComponent);

      var _this = _possibleConstructorReturn(this, (ThruxComponent.__proto__ || Object.getPrototypeOf(ThruxComponent)).call(this, props));

      _this.observers = {};

      _this.addObserver = function (key) {
        _this.observers[key] = function (state) {
          var newState = {};
          newState[key] = state;
          _this.setState(newState);
        };
        (0, _thrux.observe)(key, _this.observers[key]);
      };

      _this.componentWillUnmount = function () {
        return (0, _forEach2.default)(_this.observers, function (observer, key) {
          return (0, _thrux.removeObserver)(key, observer);
        });
      };

      _this.state = (0, _assign2.default)(_this.state || {}, (0, _thrux.state)([].concat(stateKey)));
      (0, _isArray2.default)(stateKey) ? (0, _forEach2.default)(stateKey, _this.addObserver) : _this.addObserver(stateKey);
      return _this;
    }

    return ThruxComponent;
  }(ReactComponent);

  return ThruxComponent;
};