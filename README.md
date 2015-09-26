# React Rangeslider
> A lightweight react component that acts as a HTML5 input range slider polyfill

Check out [examples](https://github.com/whoisandie/react-rangeslider).

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
        onChange={this.handleChange} />
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
        onChange={this.handleChange} />
    );
  }
}
```

## API
Rangeslider is bundled with a single dumb component, that accepts data and callbacks only as `props`.

### Pure Component

```js
<Slider
	min={String or Number}
	max={String or Number}
	step={String or Number}
	orientation={String}
  value={Number}
  onChange={Function} />
```

### Props

Prop   	 			 |  Value
---------   	 |  ------
`min`     		 |  minimum value the slider can hold (default: 0)
`max`    			 |  maximum value the slider can hold (default: 100)
`step` 				 |  step in which increments/decrements have to be made (default: 1)
`orientation`  |  orientation of the slider (default: horizontal)
`value`  			 |  current value of the slider
`onChange`  	 |  function the slider takes, current value of the slider as the first parameter


## Bug Reports & Feature Requests
Feel free to contribute. Submit a Pull Request or open an issue for further discussion.

## License
MIT &copy; [whoisandie](http://whoisandie.com)
