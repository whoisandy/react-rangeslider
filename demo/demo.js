import React from 'react';
import Slider from 'react-rangeslider';

const { Component } = React;

class Demo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hor: 10,
      ver: 2,
      flo: 10.3,
      neg: -10,
    };
  }

  handleChangeHor = (value) => {
    this.setState({
      hor: value
    });
  }

  handleChangeVer = (value) => {
    this.setState({
      ver: value,
    });
  }

  handleChangeNeg = (value) => {
    this.setState({
      neg: value,
    });
  }

  handleChangeFlo = (value) => {
    this.setState({
      flo: value,
    });
  }

  render() {
    let { hor, ver, neg, flo } = this.state;
    return (
      <div className="rangeslider__demo">
        <h1>React RangeSlider</h1>
        <p>A simple, dumb & configurable range-slider component built with and for React.</p>

        <h4>Horizontal Slider</h4>
        <div>Value: {hor}</div>

        <Slider
          min={0}
          max={100}
          value={hor}
          onChange={this.handleChangeHor} />

        <h4>Negative Values</h4>
        <div>Value: {neg}</div>
        <Slider
          min={-20}
          max={0}
          value={neg}
          onChange={this.handleChangeNeg} />

        <h4>Floating Point</h4>
        <div>Value: {flo}</div>
        <Slider
          min={10}
          max={11}
          step={0.1}
          value={flo}
          onChange={this.handleChangeFlo} />

        <h4>Orientation &amp; Custom Styles</h4>
        <div>Value: {ver}</div>
        <Slider
          min={0}
          max={5}
          value={ver}
          orientation="vertical"
          onChange={this.handleChangeVer} />
      </div>
    );
  }
}

export default Demo;
