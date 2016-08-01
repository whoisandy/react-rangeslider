import './demo.less';

import React, { Component } from 'react';
import Slider from 'react-rangeslider';

class Demo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			hor: 10,
			ver: 50,
			flo: 10.2,
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
			<div className="wrapper">
				<header>
					<h1>React Rangeslider</h1>
					<p>A lightweight react component that acts as a HTML5 input range slider polyfill. Shown below are just examples, please refer <a href="http://github.com/whoisandie/react-rangeslider">Github</a> for docs.</p>
				</header>

				<section id="examples">
					<h2>Examples</h2>

					<h4>Basic Slider</h4>
					<Slider
						min={0}
						max={100}
						value={hor}
						fill={35}
						onChange={this.handleChangeHor} />
					<div className="value">Value: {hor}</div>
					<hr/>

					<h4>Negative Values</h4>
					<Slider
						min={-20}
						max={0}
						value={neg}
						onChange={this.handleChangeNeg} />
					<div className="value">Value: {neg}</div>
					<hr/>

					<h4>Floating Point</h4>
					<Slider
						min={10}
						max={11}
						step={0.1}
						value={flo}
						onChange={this.handleChangeFlo} />
					<div className="value">Value: {flo}</div>
					<hr/>

					<h4>Orientation &amp; Custom Styles</h4>
					<Slider
						min={0}
						max={100}
						value={ver}
						orientation="vertical"
						onChange={this.handleChangeVer} />
					<div className="value">Value: {ver}</div>
				</section>

				<footer>
					<p>Project is under Open Source <a href="#">MIT License</a></p>
					<p>Built with &hearts; &#8226; 2015 &copy; <a href="http://whoisandie.com">whoisandie</a></p>
				</footer>
			</div>
		);
	}
}

export default Demo;
