/**
 * Created by thram on 21/01/17.
 */
import {observe} from "thrux";

export const connect = (stateKey, ReactComponent) => {
  class ThruxComponent extends ReactComponent {
    constructor(props) {
      super(props);
      observe(stateKey, (state) => {
        const newState     = {};
        newState[stateKey] = state;
        this.setState(newState);
      })
    }
  }
  return ThruxComponent;
};