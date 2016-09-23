const ReactDOM = require('react-dom');
const Slider = require('./src/index.js');
const React = require('react');
const Clone = require('clone');

const Header = require('react-bootstrap').PageHeader;
const Panel = require('react-bootstrap').Panel;
const Label = require('react-bootstrap').Label;


// Bootstrap reference: https://react-bootstrap.github.io/components.html

let KitchenSink = React.createClass({

	getInitialState: function() {
		return {
			large_slider_with_fill: {
				value: 465,
				max: 1000,
				min:0,
				onChange: this.onChange.bind(this, "large_slider_with_fill")
			},
			large_slider_with_sticky_fill: {
				value: 355,
				fill: 200,
				max: 1000,
				min: 0,
				onChange: this.onChange.bind(this, "large_slider_with_sticky_fill")
			},
			small_slider_with_fill: {
				value: 355,
				max: 1000,
				min: 0,
				onChange: this.onChange.bind(this, "small_slider_with_fill")
			},
			small_slider_with_sticky_fill: {
				value: 355,
				max: 1000,
				fill: 200,
				min: 0,
				onChange: this.onChange.bind(this, "small_slider_with_sticky_fill")
			}
		};
	},

	onChange: function(slider_name, e) {
		let value = e;
		let new_state = Clone(this.state);
		new_state[slider_name].value = e;
		this.setState(new_state);
	},

	render: function() {
		return (
			<div>
				<Header>
					Kronos technologies' implementation of React-RangeSlider
				</Header>
				<div style={{width: "900px", marginLeft: "300px"}}>
					<Panel header="Large slider with fill">
						<div>
							<Slider {...this.state.large_slider_with_fill}/>
							<h3>Value: <Label bsStyle="success">{this.state.large_slider_with_fill.value}</Label></h3>
						</div>
					</Panel>
					<Panel header="Large slider with sticky fill">
						<div>
							<Slider {...this.state.large_slider_with_sticky_fill}/>
							<h3>Value: <Label bsStyle="success">{this.state.large_slider_with_sticky_fill.value}</Label></h3>
							<h3>Fill: <Label bsStyle="success">{this.state.large_slider_with_sticky_fill.fill}</Label></h3>
						</div>
					</Panel>
					<Panel header="Small slider with fill">
						<div style={{width: "400px"}}>
							<Slider {...this.state.small_slider_with_fill}/>
							<h3>Value: <Label bsStyle="success">{this.state.small_slider_with_fill.value}</Label></h3>
						</div>
					</Panel>
					<Panel header="Small slider with sticky fill">
						<div style={{width: "400px"}}>
							<Slider {...this.state.small_slider_with_sticky_fill}/>
							<h3>Value: <Label bsStyle="success">{this.state.small_slider_with_sticky_fill.value}</Label></h3>
							<h3>Fill: <Label bsStyle="success">{this.state.small_slider_with_sticky_fill.fill}</Label></h3>
						</div>
					</Panel>
				</div>
			</div>
		);
	}
});

(function(){
	ReactDOM.render(
		React.createElement(
			KitchenSink
		),
		document.getElementById('mount')
	);

})();
