/**
 * Created by thram on 21/01/17.
 */
import forEach from "lodash/forEach";
import isArray from "lodash/isArray";
import {observe} from "thrux";

export const connect = (stateKey, ReactComponent) => {
  class ThruxComponent extends ReactComponent {
    constructor(props) {
      super(props);

      const addObserver = (key) => observe(key, (state) => {
        const newState = {};
        newState[key]  = state;
        this.setState(newState);
      });

      isArray(stateKey) ? forEach(stateKey, addObserver) : addObserver(stateKey);
    }
  }
  return ThruxComponent;
};