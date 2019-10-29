import React from 'react';
import classes from './NavBar.module.scss';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
	const logouthandler = () => {
		sessionStorage.setItem('loginStatus', '');
		sessionStorage.setItem('state', '');
		props.updateLoginState('');
	};
	let navBtns = (
		<ul>
			<li>
				<Link to="/login">LogIn</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
		</ul>
	);
	if (props.loginStatus === 'true') {
		navBtns = (
			<ul>
				<li>
					<p>{JSON.parse(sessionStorage.getItem('state')).name}</p>
				</li>
				<li>
					<Link to="/" onClick={logouthandler}>
						Logout
					</Link>
				</li>
			</ul>
		);
	}
	return (
		<nav className={classes.navbar}>
			<Link className={classes.logo} to="/">
				Maily
			</Link>
			{navBtns}
		</nav>
	);
};

export default NavBar;
