/**
 * Created by thram on 21/01/17.
 */
import React, { Component } from 'react';
import _forEach from 'lodash/forEach';
import _assign from 'lodash/assign';
import _reduce from 'lodash/reduce';
import _isFunction from 'lodash/isFunction';
import _isEqual from 'lodash/isEqual';
import _keys from 'lodash/keys';
import _pick from 'lodash/pick';
import { observe, state, removeObserver } from 'thrux';


export const connect = (stateKey, ReactComponent, map) => class ThruxComponent extends Component {
  constructor(props) {
    super(props);
    this.observers = {};
    this.state = _assign({}, _reduce(state([].concat(stateKey)), this.applyMap, {}));
  }

  componentDidMount = () => {
    _forEach([].concat(stateKey), (key) => {
      this.observers[key] = (stateValue) => {
        const newState = this.applyMap({}, stateValue, key);
        if (!_isEqual(_pick(this.state, _keys(newState)), newState)) this.setState(newState);
      };
      observe(key, this.observers[key]);
    });
  };
  componentWillUnmount = () => {
    _forEach(this.observers, (observer, key) => removeObserver(key, observer));
    this.observers = {};
  };
  applyMap = (res, value, key) => {
    const result = res;
    if (map) {
      if (_isFunction(map)) {
        _assign(result, map(value));
      } else if (map[key]) {
        _assign(result, map[key](value));
      } else {
        result[key] = value;
      }
    } else {
      result[key] = value;
    }

    return result;
  };
  render = () => <ReactComponent
    ref={(component) => {
      this.wrapper = component;
    }} {...this.props} {...this.state}
  />;
};

export default { connect };
