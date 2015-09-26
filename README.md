# React Rangeslider
> A lightweight react component that acts as a HTML5 input range slider polyfill

Check out examples.

## Features

## Install
Install via `npm` (use `--save` to include it in your package.json)

```bash
$ npm install react-rangeslider --save
```

## Usage
```js
import React, { Component } from 'react';
import Slider from 'react-rangeslider';

export default Volume extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 10 /** Start/Default value **/
    };
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <Slider
        min={0}
        max={100}
        value={value}
        orientation="vertical"
        onChange={this.handleChange} />
    );
  }
}
```

## Bug Reports & Feature Requests
Feel free to contribute. Submit a Pull Request or open an issue for further discussion.

## License
MIT &copy; [whoisandie](http://whoisandie.com)
