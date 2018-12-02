import '@babel/polyfill';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Routes />
			</Router>
		);
	}
}
