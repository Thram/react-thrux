/**
 * Created by thram on 27/02/17.
 */
import test from "tape";
import React from "react";
import {shallow} from 'enzyme';
import {register, createDict} from "thrux";
import {connect} from "../src/index";

const Example = React.createClass({
  render() {
    return (<div>{this.props.test}</div>);
  }
});

register({
  test : {
    INIT: createDict(() => 0)
  },
  test2: {
    INIT: createDict(() => 0)
  }
});

test('Connect component to a Thrux State', (assert) => {
  const Connected          = connect('test', Example),
        ConnectedComponent = shallow(<Connected  />),
        expected           = 0,
        actual             = ConnectedComponent.props().test;
  assert.equal(actual, expected, 'Component correctly connected');
  assert.end();
});

test('Connect component to multiple Thrux State', (assert) => {
  const Connected          = connect(['test', 'test2'], Example),
        ConnectedComponent = shallow(<Connected  />),
        expected           = {test: 0, test2: 0},
        actual             = ConnectedComponent.props();
  assert.deepEqual(actual, expected, 'Component correctly connected');
  assert.end();
});