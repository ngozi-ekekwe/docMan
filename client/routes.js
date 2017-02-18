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

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="home" component={HomePage}  />
        <Route path="login" component={Login} />
        <Route path="signup" component={Register} />
        <Route path="createrole" component={RolePage} />
        <Route path="createdoc" component={CreateDocument} />
        <Route path="role" component={ManageRolePage} />
        <Route path="role/:id" component={ManageRolePage} />
    </Route>
)
