import React from 'react';
import Demo from './demo';

main();
function main() {
	let app;

	if (process.env.NODE_ENV === 'development') {
		app = document.createElement('div');
		app.setAttribute('id', 'demo');
		document.body.appendChild(app);
	} else {
		app = document.getElementById('demo');
	}

	React.render(<Demo />, app);
}
