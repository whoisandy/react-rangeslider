import React from 'react';
import Slider from 'react-rangeslider';

const { Component } = React;

class Demo extends Component {
  render() {
    return (
      <div className="rangeslider__demo">
        <h1>React RangeSlider</h1>
        <Slider />
      </div>
    );
  }
}

export default Demo;
