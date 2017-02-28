# react-thrux

[![Travis build](https://img.shields.io/travis/Thram/react-thrux.svg?style=flat-square)](https://travis-ci.org/Thram/react-thrux)
[![version](https://img.shields.io/npm/v/react-thrux.svg?style=flat-square)](https://www.npmjs.com/package/react-thrux)
[![downloads](https://img.shields.io/npm/dt/react-thrux.svg?style=flat-square)](https://www.npmjs.com/package/react-thrux)
[![MIT License](https://img.shields.io/npm/l/react-thrux.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Connect [Thrux](https://github.com/Thram/thrux) state to a React component.

## API

#### connect(stateKey *[stateKey,...]*, ReactComponent, map[s])

Register your dictionaries.

***returns:*** React Component[Object]

Param | Type | Description
----- | ---- | -----------
stateKey | String [Array of Strings] | Name(s) of the state(s) you want to connect your component with
ReactComponent | [Function] / [Class] | React Component
map[s] | [Function] / [Object] | *(optional)* Map(s) to sanitize the values passed to the component 

`registers.js`
```javascript
import {register, createDict} from "thrux";

register({
  counter: {
    INIT    : createDict(() => 0),
    TEST    : createDict((payload, {value}) => ({value, test: payload})),
    INCREASE: createDict((payload, state) => (state || 0) + 1),
    DECREASE: createDict((payload, state) => (state > 0) ? state - 1 : 0),
    RESET   : createDict((payload, state) => 0)
  }
});
```

`Counter.jsx`
```javascript
/**
 * Created by thram on 21/01/17.
 */
import React, {Component} from "react";
import {dispatch, initState} from "thrux";
import {connect} from "react-thrux";


class Counter extends Component {
  onIncrease = () =>
      dispatch([
        'counter:INCREASE',
        'counter2:INCREASE'
      ]);

  onDecrease = () =>
      dispatch([
        'counter:DECREASE',
        'counter2:DECREASE'
      ]);
  onTest     = () =>
      dispatch('counter:TEST', 'This is a test');

  onReset = () =>
      initState([
        'counter',
        'counter2'
      ]);

  render() {
    return (
        <div style={styles.container}>
          <div style={styles.column}>
            <div style={styles.clickArea} onClick={this.onIncrease}>
              Click Area
            </div>
            <button onClick={this.onDecrease}>Decrease</button>
            <button onClick={this.onReset}>Reset</button>
            <button onClick={this.onTest}>Test</button>
          </div>
          <div style={styles.column}>
            Clicks: <span>{this.props.data}</span>
            Clicks 2: <span>{this.props.counter2.value}</span>
          </div>
        </div>
    )
  }
}

const styles = {
  container: {
    fontFamily: "Helvetica, Arial, sans-serif"
  },

  clickArea: {
    padding   : '20px',
    width     : '200px',
    height    : '200px',
    border    : '1px solid black',
    background: 'teal'
  },
  column   : {
    padding: '20px',
    display: 'inline-block',
    float  : 'left'
  }
};

export default connect(['counter', 'counter2'], Counter, {counter: ({value}) => ({data: value})});

```