// @flow
import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import createForm from './components/form/util/createForm';

export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/fk"/>
        {createForm(require('./form-config/fk/config.js'), 'dr')}
    </Route>
);
