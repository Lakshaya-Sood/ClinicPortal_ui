import React from 'react';
import universal from 'react-universal-component';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';


const UniversalComponent = universal(props => import(`../Views/${props.page}`), {
	loading: () => (
		<div className={styles.loading}>
			<img src={logo} alt="Loading Logo" />
		</div>
	),
	ignoreBabelRename: true,
});

export default () => (
	<div>
		<Link to={`/`} className={''}>
				<span>React SSR Boilerplate</span>
		</Link>
		<Switch>
			<Route
				exact
				path="/"
				render={routeProps => <UniversalComponent page="MyPage" {...routeProps} />}
			/>
		</Switch>
	</div>
);
