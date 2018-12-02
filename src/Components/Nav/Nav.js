import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Nav.css';
import logo from '../../assets/images/logo.svg';
import './x.css';
function Nav() {
	console.log(styles.active)
	return (
		<div className={styles.navigation}>
			<Link to={`/`} className={''}>
				<span>React SSR Boilerplate</span>
			</Link>
			<ul className={styles.menu}>
				<li>
					<NavLink to={`/about`} activeClassName={'down'}>
						About
					</NavLink>
				</li>
				<li>
					<NavLink to={`/article`} activeClassName={styles.active}>
						Article
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default Nav;
