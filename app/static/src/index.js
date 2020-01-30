import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { getCookie } from './Utils';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/ReduxReducers';
import { checkToken } from './actions/ReduxActions';
import Game from './components/Game';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if (getCookie('token')) {
    store.dispatch(checkToken(getCookie('token')));
}

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('app')
);
