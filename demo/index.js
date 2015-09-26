import React from 'react';
import Demo from './demo';

main();
function main() {
	let app;

	app = document.createElement('div');
	app.setAttribute('id', 'demo');
	document.body.appendChild(app);

	React.render(<Demo />, app);
}
