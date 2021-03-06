import React from 'react';
import universal from 'react-universal-component';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './loading.css';
import logo from '../assets/images/logo.svg';
import {Navbar,Glyphicon} from 'react-bootstrap';

const UniversalComponent = universal(props => import(`../Views/${props.page}`), {
	loading: () => (
		<div className={styles.loading}>
			<img src={logo} alt="Loading Logo" />
		</div>
	),
	ignoreBabelRename: true,
});
let userLoggedIn = false,
	userName = ''
let onUserLogin = (val) => {
	userLoggedIn = true;
	userName = val
}
export default () => (
	<div>
		{/* <Link to={`/`} className={''}>
				<span>React SSR Boilerplate</span>
		</Link> */}
		<Navbar>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/" style={{fontSize:'23px'}}><Glyphicon glyph="leaf" /> ClinicPortal</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				{!userLoggedIn ? 
					(<Navbar.Text pullRight>Have a great day!</Navbar.Text>) : 
					(<Navbar.Text pullRight><Glyphicon glyph="user" /> {userName}</Navbar.Text>)
				}
			</Navbar.Collapse> 
		</Navbar>
		<Switch>
			<Route
				exact
				path="/"
				render={routeProps => <UniversalComponent page="MyPage" {...routeProps} />}
			/>
			<Route
				exact
				path="/login"
				render={routeProps => <UniversalComponent page="Login" {...routeProps} onUserLogin={onUserLogin} />}
			/>
			<Route
				exact
				path="/patient"
				render={routeProps => <UniversalComponent page="PatientDashboard" {...routeProps} />}
			/>
			
		</Switch>
	</div>
);
