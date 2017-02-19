import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
const Header = () => {
    return (
        <nav className="white">
            <div className="navbar nav-wrapper">
                <IndexLink to="/" activeClassName="active" className="brand-logo">Go Docs</IndexLink>
                <Link to="/home" activeClassName="active" className="right">Home</Link>
                {" | "}
                <Link to="/login" activeClassName="active" className="right">Login</Link>
                {" | "}
                <Link to="/signup" activeClassName="active" className="right">SignUp</Link>
                {" | "}
                <Link to="/createrole" activeClassName="active" className="right">role</Link>
                {" | "}
                <Link to="/rolepage" activeClassName="active" className="right ">role table</Link>
                {" | "}
                <Link to="/createdoc" activeClassName="active" className="right">Doc</Link>
                {" | "}
                <Link to="/role" activeClassName="active" className="right">Manage</Link>
                <LoadingDots interval={100} dots={20} />
            </div>
        </nav>

    );
}

export default Header;