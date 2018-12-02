import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import {Provider} from 'react-redux';
import Routes from '../App/Routes';
import configureStore from '../App/configureStore'
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

export default ({ clientStats }) => (req, res) => {
	// Create a sheetsRegistry instance.
	const sheetsRegistry = new SheetsRegistry();

	// Create a sheetsManager instance.
	const sheetsManager = new Map();

	// Create a theme instance.
	const theme = createMuiTheme({
	palette: {
		primary: green,
		accent: red,
		type: 'light',
	},
	});

	// Create a new class name generator.
	const generateClassName = createGenerateClassName();

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
			<JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      			<MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
					<StaticRouter location={req.originalUrl} context={{}}>
							<Routes />
					</StaticRouter>
				</MuiThemeProvider>
			</JssProvider>
		</Provider>
	);


	const { js, styles, cssHash } = flushChunks(clientStats, {
		chunkNames: flushChunkNames(),
	});

	const material_css = sheetsRegistry.toString()

	const status = 200;

	res
		.status(status)
		.send(`
			<!doctype html>
			<html lang="en">
				<head>
					<meta name="theme-color" content="#000000"/>${styles}${material_css}
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
