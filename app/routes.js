// @flow
import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import AppIndex from './components/Index';
import { createForm } from '../form-generator/index.js';

export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/index"/>
        <Route path="index" component={AppIndex} />
        {createForm(require('./form-config/fk/config.js'))}
        {createForm(require('./form-config/dr/config.js'))}
    </Route>
);
