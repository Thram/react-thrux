/**
 * Created by thram on 21/01/17.
 */
import React from "react";
import forEach from "lodash/forEach";
import assign from "lodash/assign";
import reduce from "lodash/reduce";
import isFunction from "lodash/isFunction";
import isEqual from "lodash/isEqual";
import keys from "lodash/keys";
import pick from "lodash/pick";
import {observe, state, removeObserver} from "thrux";


export const connect = (stateKey, ReactComponent, map) => React.createClass({
  observers: {},
  applyMap : (res, value, key) => (map ?
      (isFunction(map) ? assign(res, map(value))
          : (map[key] ? assign(res, map[key](value))
              : res[key] = value))
      : res[key] = value, res),
  getInitialState() {
    return assign(this.state || {}, reduce(state([].concat(stateKey)), this.applyMap, {}))
  },
  componentDidMount() {
    forEach([].concat(stateKey), (key) => {
      this.observers[key] = (stateValue) => {
        const newState = this.applyMap({}, stateValue, key);
        !isEqual(pick(this.state, keys(newState)), newState) && this.setState(newState);
      };
      observe(key, this.observers[key]);
    });
  },
  componentWillUnmount(){
    forEach(this.observers, (observer, key) => removeObserver(key, observer));
    this.observers = {};
  },
  render() {
    return React.createElement(ReactComponent, assign({}, this.props, this.state))
  }
});