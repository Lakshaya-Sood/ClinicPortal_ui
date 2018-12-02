import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Routes from '../App/Routes';

export default ({ clientStats }) => (req, res) => {

	let lang = 'en';

	const context = {};
	const app = renderToString(
		<StaticRouter location={req.originalUrl} context={context}>
			<Routes lang={lang} />
		</StaticRouter>,
	);

	const status = 200;

	res
		.status(status)
		.send(
			`
			<!doctype html>
			<html lang="${lang}">
				<head>
					<meta name="theme-color" content="#000000"/>
				</head>
				<body>
					<div id="react-root">
						${app}
					</div>
				</body>
			</html>`,
		);
};
