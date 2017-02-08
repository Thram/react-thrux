"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _forEach = require("lodash/forEach");

var _forEach2 = _interopRequireDefault(_forEach);

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

      var addObserver = function addObserver(key) {
        return (0, _thrux.observe)(key, function (state) {
          var newState = {};
          newState[key] = state;
          _this.setState(newState);
        });
      };

      (0, _isArray2.default)(stateKey) ? (0, _forEach2.default)(stateKey, addObserver) : addObserver(stateKey);
      return _this;
    }

    return ThruxComponent;
  }(ReactComponent);

  return ThruxComponent;
};