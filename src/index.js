/**
 * Created by thram on 21/01/17.
 */
import forEach from "lodash/forEach";
import assign from "lodash/assign";
import isArray from "lodash/isArray";
import {observe, state, removeObserver} from "thrux";

export const connect = (stateKey, ReactComponent) => {
  class ThruxComponent extends ReactComponent {

    observers = {};

    constructor(props) {
      super(props);
      this.state = assign(this.state || {}, state([].concat(stateKey)));
    }

    addObserver = (key) => {
      this.observers[key] = (state) => {
        let newState  = {};
        newState[key] = state;
        this.setState(newState);
      };
      observe(key, this.observers[key]);
    };

    componentDidMount(...args) {
      super.componentDidMount.apply(this, args);
      isArray(stateKey) ? forEach(stateKey, this.addObserver) : this.addObserver(stateKey);
    }

    componentWillUnmount(...args) {
      super.componentWillUnmount.apply(this, args);
      forEach(this.observers, (observer, key) => removeObserver(key, observer));
    }
  }
  return ThruxComponent;
};