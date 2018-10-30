import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {incrementCounter, decrementCounter} from "./testActions";

class TestComponent extends Component {
  render() {
    const {data, incrementCounter, decrementCounter} = this.props;

    return (
      <div>
        <h1>Test Area: {data}</h1>
        <Button onClick={incrementCounter} color="green" content="Increment"/>
        <Button onClick={decrementCounter} color="red" content="Decrement"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

export default connect(mapStateToProps, actions)(TestComponent);