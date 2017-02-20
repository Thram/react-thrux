/**
 * Created by thram on 21/01/17.
 */
import forEach from "lodash/forEach";
import assign from "lodash/assign";
import isArray from "lodash/isArray";
import {observe, state, removeObserver} from "thrux";

export const connect = (stateKey, ReactComponent) => {
  class ThruxComponent extends ReactComponent {

    constructor(props) {
      super(props);
      this.observers = {};
      this.state     = assign(this.state || {}, state([].concat(stateKey)));
      isArray(stateKey) ? forEach(stateKey, this.addObserver) : this.addObserver(stateKey);
    }

    addObserver(key) {
      this.observers[key] = (state) => {
        let newState  = {};
        newState[key] = state;
        this.setState(newState);
      };
      observe(key, this.observers[key]);
    };

    componentWillUnmount() {
      forEach(this.observers, (observer, key) => removeObserver(key, observer))
    }
  }
  return ThruxComponent;
};