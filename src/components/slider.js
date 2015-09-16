import React from 'react';
import Fill from './fill';
import Handle from './handle';

const { Component } = React;

class Slider extends Component {
  render() {
    return (
      <div className="rangeslider">
        <Fill />
        <Handle />
      </div>
    );
  }
}

export default Slider;
