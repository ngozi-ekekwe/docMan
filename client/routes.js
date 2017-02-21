import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/SignUp';
import RolePage from './containers/RolePage';
import CreateDocument from './components/CreateDocument';
import ManageRolePage from './containers/ManageRolePage'
import UserPage from './containers/UserPage'
import ManageUserPage from './containers/ManageUserPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="home" component={HomePage}  />
        <Route path="login" component={Login} />
        <Route path="signup" component={Register} />
        <Route path="roles" component={RolePage} />
        <Route path="createdoc" component={CreateDocument} />
        <Route path="role" component={ManageRolePage} />
        <Route path="role/:id" component={ManageRolePage} />
        <Route path="register" component={UserPage} />
        <Route path="user" component={ManageUserPage} />
    </Route>
)
