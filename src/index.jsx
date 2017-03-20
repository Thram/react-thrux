/**
 * Created by thram on 21/01/17.
 */
import React, { Component } from 'react';
import forEach from 'lodash/forEach';
import assign from 'lodash/assign';
import reduce from 'lodash/reduce';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import { observe, state, removeObserver } from 'thrux';


export const connect = (stateKey, ReactComponent, map) => class ThruxComponent extends Component {
  constructor(props) {
    super(props);
    this.observers = {};
    this.state = assign({}, reduce(state([].concat(stateKey)), this.applyMap, {}));
  }

  componentDidMount = () => {
    forEach([].concat(stateKey), (key) => {
      this.observers[key] = (stateValue) => {
        const newState = this.applyMap({}, stateValue, key);
        if (!isEqual(pick(this.state, keys(newState)), newState)) this.setState(newState);
      };
      observe(key, this.observers[key]);
    });
  };
  componentWillUnmount = () => {
    forEach(this.observers, (observer, key) => removeObserver(key, observer));
    this.observers = {};
  };
  applyMap = (res, value, key) => {
    const result = res;
    if (map) {
      if (isFunction(map)) {
        assign(result, map(value));
      } else if (map[key]) {
        assign(result, map[key](value));
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
