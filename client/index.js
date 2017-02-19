import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import { Provider} from 'react-redux';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../client/styles/custom.scss';
import store from './store/configureStore';
import {createRole, fetchRoles, saveRole} from './actions/roleAction';
import '../node_modules/toastr/build/toastr.min.css';

store.dispatch(fetchRoles());
render(
    <Provider store={store}>
    <Router history= {browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
