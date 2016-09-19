# React Rangeslider [![NPM Package][npm_img]][npm_site] [![Travis Status][trav_img]][trav_site]
> A lightweight responsive react range slider component.

Check out [examples](https://whoisandie.github.io/react-rangeslider).

## Install
Install via `npm` (use `--save` to include it in your package.json)

```bash
$ npm install react-rangeslider --save
```

## Usage
React-Rangeslider is bundled with a single slider component. You can require them in plain old ES5 syntax or import them in ES6 syntax.

...plain old ES5

```js
...
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
        onChange={this.handleChange}
      />
		);
	}
});

module.exports = Volume;
```

... or use ES6 syntax

```js
...
import Slider from 'react-rangeslider';

export default class Volume extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 10 /** Start value **/
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  }

  render() {
    let { value } = this.state;
    return (
    	<div>
	      <Slider
          value={value}
          orientation="vertical"
          onChange={this.handleChange}
        />
	      <div>Value: {value}</div>
	    </div>
    );
  }
}
```
There's also a umd version available at `lib/umd`. The component is available on `window.ReactRangeslider`. To style the slider, please refer the rangeslider styles in `demo/demo.less` file.

## API
Rangeslider is bundled as a single component, that accepts data and callbacks only as `props`.

### Component
```js
import Slider from 'react-rangeslider'

// inside render
<Slider
  min={Number}
  max={Number}
  step={Number}
  orientation={String}
  value={Number}
  onChange={Function}
/>
```

### Props
Prop   	 			 |  Type      |  Default      |  Description
---------   	 |  -------   |  -------      |  -----------
`min`     		 |  number    |  0				   	|  minimum value the slider can hold
`max`    			 |  number    |  100				  |  maximum value the slider can hold
`step` 				 |  number    |  1          	|  step in which increments/decrements have to be made
`orientation`  |  string    |  horizontal   |  orientation of the slider
`value`  			 |  number    |  -            |  current value of the slider
`onChange`  	 |  function  |  -            |  function the slider takes, current value of the slider as the first parameter


## Issues
Feel free to contribute. Submit a Pull Request or open an issue for further discussion.

## License
MIT &copy; [whoisandie](http://whoisandie.com)

[trav_img]: https://api.travis-ci.org/whoisandie/react-rangeslider.svg
[trav_site]: https://travis-ci.org/whoisandie/react-rangeslider
[npm_img]: https://img.shields.io/npm/v/react-rangeslider.svg?style=flat-square
[npm_site]: https://www.npmjs.org/package/react-rangeslider
