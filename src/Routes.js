import React from 'react';
import Dashboard from './Dashboard';
import Configure from './Configure';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Dashboard} />
            <Route path="/configure" component={Configure} />
        </Router>
    );
}