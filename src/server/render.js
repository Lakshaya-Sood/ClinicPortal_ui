import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Routes from '../App/Routes';

import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

export default ({ clientStats }) => (req, res) => {

	const app = renderToString(
		<StaticRouter location={req.originalUrl}>
			<Routes />
		</StaticRouter>,
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
				</head>
				<body>
					<div id="react-root">${app}</div>
				</body>${js}${cssHash}
			</html>`,
		);
};
