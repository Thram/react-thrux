/**
 * Created by thram on 21/01/17.
 */
import isArray from "lodash/isArray";
import {observe, state} from "thrux";

export const connect = (stateKey, ReactComponent) => {
  class ThruxComponent extends ReactComponent {
    constructor(props) {
      super(props);

      this.state = state([].concat(stateKey));

      const addObserver = (key) => observe(key, (state) => {
        const newState = {};
        newState[key]  = state;
        this.setState(newState);
      });

      isArray(stateKey) ? stateKey.forEach(addObserver) : addObserver(stateKey);
    }
  }
  return ThruxComponent;
};