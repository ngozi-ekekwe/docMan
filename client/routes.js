import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/SignUp';
import RolePage from './containers/RolePage';
import ManageRolePage from './containers/ManageRolePage'
import UserPage from './containers/UserPage'
import ManageUserPage from './containers/ManageUserPage';
import DocumentContainer from '../client/containers/DocumentContainer';

const checkIfLoggedIn = (nextState, replace) => {
 const user = JSON.parse(localStorage.getItem('currentUser'));
 if (user && user.userId == undefined) {
    replace({ pathname: '/' });
 }
}

const logUserOut = (nextState, replace, done) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user && user.userId == undefined) {
    replace({ pathname: '/' });
  }
  localStorage.removeItem("currentUser");
  window.location = '/';
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="login" component={Login} onEnter={checkIfLoggedIn}/>
        <Route path="signup" component={Register} />
        <Route path="roles" component={RolePage} />
        <Route path="createdoc" component={DocumentContainer} />
        <Route path="role" component={ManageRolePage} />
        <Route path="role/:id" component={ManageRolePage} />
        <Route path="register" component={UserPage} />
        <Route path="user" component={ManageUserPage} />
        <Route path="logout" onEnter={logUserOut} />
    </Route>
)
