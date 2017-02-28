import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const renderIfLoggedIn = () => {
	const user = JSON.parse(localStorage.getItem('currentUser'));
	if (user && user.UserId) {
		return (
			<ul id="nav-mobile" className="right hide-on-med-and-down">
				<li>
					<Link to="/createdoc" activeClassName="active" className="right">Add Document</Link>
				</li>
				<li>
					<Link to="/role" activeClassName="active" className="right">Add Role</Link>
				</li>
				<li>
					<Link to="/register" activeClassName="active" className="right">Add User</Link>
				</li>
				<li>
					<Link to="/roles" activeClassName="active" className="right">Roles</Link>
				</li>
				<li>
					<Link to="/logout" activeClassName="active" className="right">Logout</Link>
				</li>
				<li>
					<Link to="/register" activeClassName="active" className="right">Users</Link>
				</li>
			</ul>
		);
	}
	return (
		<ul id="nav-mobile" className="right hide-on-med-and-down">
			<li>
				<Link to="/" activeClassName="active" className="right">Home</Link>
			</li>
			<li>
				<Link to="/login" activeClassName="active" className="right">Login</Link>
			</li>
			<li>
				<Link to="/signups" activeClassName="active" className="right">Sign up</Link>
			</li>
		</ul>
	)
}
const Header = () => {
	return (
		<nav className="white">
			<div className="navbar nav-wrapper">
				<IndexLink to="/" activeClassName="active" className="brand-logo">DMS</IndexLink>
				{renderIfLoggedIn()}
			</div>
		</nav>

	);
}

export default Header;