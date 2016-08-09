# React Rangeslider
> A lightweight responsive react range slider component.

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
Rangeslider is bundled with a single component, that accepts data and callbacks only as `props`.

### Component

```js
import Slider from 'react-rangeslider'

// inside render
<Slider
	min={String or Number}
	max={String or Number}
	step={String or Number}
	orientation={String}
  value={Number}
  onChange={Function} />
```

### Props

Prop   	 			 |  Default      |  Description
---------   	 |  -------      |  -----------
`min`     		 |  0				   	 |  minimum value the slider can hold
`max`    			 |  100				   |  maximum value the slider can hold
`step` 				 |  1          	 |  step in which increments/decrements have to be made
`orientation`  |  horizontal   |  orientation of the slider
`value`  			 |  -            |  current value of the slider
`onChange`  	 |  -            |  function the slider takes, current value of the slider as the first parameter

## License
MIT
