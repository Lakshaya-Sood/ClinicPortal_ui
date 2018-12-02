import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import {Provider} from 'react-redux';
import Routes from '../App/Routes';
import configureStore from '../App/configureStore'
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

export default ({ clientStats }) => (req, res) => {
	
	let initialState = {
		reducer1: {
			articles: []
		},
		reducer2: {
			users: []
		}

	}

	const store = configureStore(initialState)
	const preloadedState = store.getState()

	const app = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.originalUrl} context={{}}>
				<Routes />
			</StaticRouter>
		</Provider>
	);


	const { js, styles, cssHash } = flushChunks(clientStats, {
		chunkNames: flushChunkNames(),
	});

	const status = 200;

	res
		.status(status)
		.send(`
			<!doctype html>
			<html lang="en">
				<head>
					<meta name="theme-color" content="#000000"/>${styles}
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
				</head>
				<body>
					<script>
						window.__STATE__ = ${JSON.stringify(preloadedState)}
					</script>
					<div id="react-root">${app}</div>
					${js}${cssHash}
				</body>
			</html>`,
		);
};
