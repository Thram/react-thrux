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
    INIT: createDict(() => 0),
    ADD : createDict((payload, state) => state + 1)
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

test('Connect component to a Thrux State and map it', (assert) => {
  const Connected          = connect('test', Example, (state) => ({value: state})),
        ConnectedComponent = shallow(<Connected  />),
        expected           = 0,
        actual             = ConnectedComponent.props().value;
  assert.deepEqual(actual, expected, 'Component correctly connected');
  assert.end();
});

test('Connect component to multiple Thrux State and map one of them', (assert) => {
  const Connected          = connect(['test', 'test2'], Example, {
          test: (state) => ({value: 0})
        }),
        ConnectedComponent = shallow(<Connected  />),
        expected           = {value: 0, test2: 0},
        actual             = ConnectedComponent.props();
  assert.deepEqual(actual, expected, 'Component correctly connected');
  assert.end();
});

test('Connect component to multiple Thrux State and map them', (assert) => {
  const Connected          = connect(['test', 'test2'], Example, {
          test : (state) => ({value: 0}),
          test2: (state) => ({value2: 0})
        }),
        ConnectedComponent = shallow(<Connected  />),
        expected           = {value: 0, value2: 0},
        actual             = ConnectedComponent.props();
  assert.deepEqual(actual, expected, 'Component correctly connected');
  assert.end();
});