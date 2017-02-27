/**
 * Created by thram on 21/01/17.
 */
import React from "react";
import forEach from "lodash/forEach";
import assign from "lodash/assign";
import {observe, state, removeObserver} from "thrux";

export const connect = (stateKey, ReactComponent) => React.createClass({
  observers: {},
  getInitialState() {
    return assign(this.state || {}, state([].concat(stateKey)))
  },
  componentDidMount() {
    forEach([].concat(stateKey), (key) => {
      this.observers[key] = (state) => {
        let newState  = {};
        newState[key] = state;
        this.setState(newState);
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