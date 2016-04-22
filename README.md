# React Rangeslider [![NPM Package][npm_img]][npm_site]
> A lightweight react component that acts as a HTML5 input range slider polyfill

Check out [examples](https://whoisandie.github.io/react-rangeslider).

## Install
Install via `npm` (use `--save` to include it in your package.json)

```bash
$ npm install react-rangeslider --save
```

## Usage
React Rangeslider is bundled with a single slider component. You can require them in plain old ES5 syntax or import them in ES6 syntax.

...plain old ES5

```js
var React = require('react');
var Slider = require('react-rangeslider');

var Volume = React.createClass({
	getInitialState: function(){
		return {
			value: 10,
		};
	}

  // Will be called once and the end of dragging the slider
  handleDragEnd: function(value) {
    // Do something with value here
  }

  // Will be called on every change while draggin the slider
	handleChange: function(value) {
		this.setState({
			value: value,
		});
	}

	render: function() {
		return (
			<Slider
        value={value}
        orientation="vertical"
        onChange={this.handleChange} 
        onDragEnd={this.handleDragEnd} />
		);
	}
});

module.exports = Volume;
```

... or use ES6 syntax

```js
import React, { Component } from 'react';
import Slider from 'react-rangeslider';

export default Volume extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 10 /** Start value **/
    };
  }

  // Will be called once and the end of dragging the slider
  handleDragEnd(value) {
    // Do something with value here
  }

  // Will be called on every change while draggin the slider
  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <Slider
        value={value}
        orientation="vertical"
        onChange={this.handleChange} 
        onDragEnd={this.handleDragEnd} />
    );
  }
}
```
There's also a umd version available at `lib/umd`. The component is available on `window.ReactRangeslider`.

## API
Rangeslider is bundled with a single component, that accepts data and callbacks only as `props`.

### Component

```js
var Slider = require('react-rangeslider');

// inside render
<Slider
	min={String or Number}
	max={String or Number}
	step={String or Number}
	orientation={String}
  value={Number}
  onChange={Function} 
  onDragEnd={Function} />
```

### Props

Prop   	 			 |  Default      |  Description
---------   	 |  -------      |  -----------
`min`     		 |  0				   	 |  minimum value the slider can hold
`max`    			 |  100				   |  maximum value the slider can hold
`step` 				 |  1          	 |  step in which increments/decrements have to be made
`orientation`  |  horizontal   |  orientation of the slider
`value`  			 |  -            |  current value of the slider
`onChange`  	 |  -            |  function the slider takes, current value of the slider as the first parameter. Will be called on every value change during the drag.
`onDragEnd`    |  -            |  function the slider takes, current value of the slider as the first parameter. Will be called once on the end of the drag.


## Issues
Feel free to contribute. Submit a Pull Request or open an issue for further discussion.

## License
MIT &copy; [whoisandie](http://whoisandie.com)

[npm_img]: https://img.shields.io/npm/v/react-rangeslider.svg?style=flat-square
[npm_site]: https://www.npmjs.org/package/react-rangeslider
