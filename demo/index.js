import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';

function render() {
	let mount = document.getElementById('mount');
	ReactDOM.render(<Demo />, mount);
}

render();
