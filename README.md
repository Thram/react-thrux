# react-thrux

[![Travis build](https://img.shields.io/travis/Thram/react-thrux.svg?style=flat-square)](https://travis-ci.org/Thram/react-thrux)
[![version](https://img.shields.io/npm/v/react-thrux.svg?style=flat-square)](https://www.npmjs.com/package/react-thrux)
[![downloads](https://img.shields.io/npm/dm/react-thrux.svg?style=flat-square)](https://www.npmjs.com/package/react-thrux)
[![MIT License](https://img.shields.io/npm/l/react-thrux.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Connect Thrux state to a React component.

## API

#### connect(stateKey, ReactComponent)

Register your dictionaries.

***returns:*** React Component[Object]

Param | Type | Description
----- | ---- | -----------
stateKey | String | Name of the state you want to connect your component with
ReactComponent | [Object] / [Class] | React Component object

```javascript
import React, {Component} from "react";
import {dispatch} from "thrux";
import {connect} from "react-thrux";


class Example extends Component {
  state = {
    counter: 0
  };

  onIncrease = () => dispatch('counter:INCREASE');
  onDecrease = () => dispatch('counter:DECREASE');
  onReset    = () => dispatch('counter:RESET');

  render() {
    return (
        <div style={styles.container}>
          <div style={styles.column}>
            <div id="click-area" style={styles.clickArea} onClick={this.onIncrease}>
              Click Area
            </div>
            <button id="decrease" onClick={this.onDecrease}>Decrease</button>
            <button id="reset" onClick={this.onReset}>Reset</button>
          </div>
          <div style={styles.column}>
            Clicks: <span>{this.state.counter}</span>
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

export default connect('counter', Example);

```