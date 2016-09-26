const cx = require('classnames');
const findDOMNode = require('react-dom').findDOMNode;
const React = require('react');
const PropTypes = require('react').PropTypes;

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.substr(1);
}

function maxmin(pos, min, max) {
	if (pos < min) { return min; }
	if (pos > max) { return max; }
	return pos;
}

const constants = {
	orientation: {
		horizontal: {
			dimension: 'width',
			direction: 'left',
			coordinate: 'x',
		},
		vertical: {
			dimension: 'height',
			direction: 'top',
			coordinate: 'y',
		}
	}
};

let Slider = React.createClass({

	fill_anchor_range: 20,

	getInitialState: function () {
		return {
			limit: 0,
			grab: 0
		};
	},

	// Add window resize event listener here
	componentDidMount: function () {
		window.addEventListener('resize', this.handleUpdate);
		this.handleUpdate();

		this.fill_anchor_range = this.props.max * 0.017;
	},

	// remove window resize event listener here
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.handleUpdate);
	},

	showTooltip: function() {
		//	insert tooltip here
	},

	handleUpdate: function () {
		let {orientation} = this.props;
		let dimension = capitalize(constants.orientation[orientation].dimension);
		const sliderPos = findDOMNode(this.refs.slider)['offset' + dimension];
		const handlePos = findDOMNode(this.refs.handle)['offset' + dimension];
		this.setState({
			limit: sliderPos - handlePos,
			grab: handlePos / 2,
		});
	},

	handleStart: function () {
		document.addEventListener('mousemove', this.handleDrag);
		document.addEventListener('mouseup', this.handleEnd);
	},

	handleDrag: function (e) {
		this.handleNoop(e);
		let value, {onChange} = this.props;
		if (!onChange) {
			console.warn('No onChange was specified for selected slider.')
		}
		value = this.position(e);
		if(this.props.fill) {
			if(value < this.props.fill + this.fill_anchor_range && value > this.props.fill - this.fill_anchor_range) {
				value = this.props.fill;
			}
		}

		onChange && onChange(value);
	},

	handleEnd: function (e) {
		if (this.props.onMouseUp) {
			let value = this.position(e);
			this.props.onMouseUp(value);
		}

		document.removeEventListener('mousemove', this.handleDrag);
		document.removeEventListener('mouseup', this.handleEnd);
	},

	handleNoop: function (e) {
		e.stopPropagation();
		e.preventDefault();
	},

	handleSliderMouseUp: function (e) {
		if (this.props.onSliderMouseUp) {
			let value = this.position(e);
			this.props.onSliderMouseUp(value);
		}
	},

	getPositionFromValue: function (value) {
		let percentage, pos;
		let {limit} = this.state;
		let {min, max} = this.props;
		percentage = (value - min) / (max - min);
		pos = Math.round(percentage * limit);

		return pos;
	},

	getValueFromPosition: function (pos) {
		let percentage, value;
		let {limit} = this.state;
		let {orientation, min, max, step} = this.props;
		percentage = (maxmin(pos, 0, limit) / (limit || 1));

		if (orientation === 'horizontal') {
			value = step * Math.round(percentage * (max - min) / step) + min;
		} else {
			value = max - (step * Math.round(percentage * (max - min) / step) + min);
		}

		return value;
	},

	position: function (e) {
		let pos, value, {grab} = this.state;
		let {orientation} = this.props;
		const node = findDOMNode(this.refs.slider);
		const coordinateStyle = constants.orientation[orientation].coordinate;
		const directionStyle = constants.orientation[orientation].direction;
		const coordinate = !e.touches
			? e['client' + capitalize(coordinateStyle)]
			: e.touches[0]['client' + capitalize(coordinateStyle)];
		const direction = node.getBoundingClientRect()[directionStyle];

		pos = coordinate - direction - grab;
		value = this.getValueFromPosition(pos);

		return value;
	},

	coordinates: function (pos) {
		let value, fillPos, handlePos;
		let {limit, grab} = this.state;
		let {orientation} = this.props;

		value = this.getValueFromPosition(pos);
		handlePos = this.getPositionFromValue(value);

		if (orientation === 'horizontal') {
			fillPos = handlePos + grab;
		} else {
			fillPos = limit - handlePos + grab;
		}
		/*
		 The fillReturn variable is manipulated to cover the edge cases.
		 If this.props.fill is zero, the fillReturn has to be zero.
		 Between zero and this.props.max, the grab value is added to be accurate with the handle position.
		 If this.props.fill equals this.props.max, the range slider has to be completely filled, which explains the " + (2 * grab)".
		 */
		let fillReturn = 0;
		if (this.props.fill > 0 && this.props.fill < this.props.max) {
			fillReturn = this.getPositionFromValue(this.props.fill) + grab;
		} else if (this.props.fill == this.props.max) {
			fillReturn = this.getPositionFromValue(this.props.fill) + ( 2 * grab);
		}

		return {
			fill: (this.props.fill >= 0) ? (fillReturn) : fillPos,
			handle: handlePos,
		};
	},

	render: function () {
		let dimension, direction, position, coords, fillStyle, handleStyle;
		let {value, orientation, className} = this.props;

		dimension = constants.orientation[orientation].dimension;
		direction = constants.orientation[orientation].direction;

		position = this.getPositionFromValue(value);
		coords = this.coordinates(position);

		fillStyle = {[dimension]: `${coords.fill}px`};
		handleStyle = {[direction]: `${coords.handle}px`};

		return (
			<div
				ref="slider"
				className={cx('rangeslider ', 'rangeslider-' + orientation, className)}
				onMouseDown={this.props.disabled ? function(){} : this.handleDrag}
				onClick={this.props.disabled ? function(){} :this.handleNoop}
				onMouseUp={this.props.disabled ? function(){} :this.handleSliderMouseUp}
				disabled={this.props.disabled}
			>
				<div
					ref="fill"
					className="rangeslider__fill"
					style={fillStyle}
					onMouseOver={this.showTooltip}
				/>
				<div
					ref="handle"
					className="rangeslider__handle"
					onMouseDown={this.props.disabled ? function(){} :this.handleStart}
					onTouchMove={this.props.disabled ? function(){} :this.handleDrag}
					onClick={this.props.disabled ? function(){} :this.handleNoop}
					style={handleStyle}/>
			</div>
		);
	}
});

Slider.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	value: PropTypes.number,
	orientation: PropTypes.string,
	onChange: PropTypes.func,
	className: PropTypes.string,
	disabled: PropTypes.bool
};

Slider.defaultProps = {
	min: 0,
	max: 100,
	step: 1,
	value: 0,
	orientation: 'horizontal',
	disabled: false
};

module.exports = Slider;
