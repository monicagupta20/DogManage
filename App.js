import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import Router from './src/screens/index';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}