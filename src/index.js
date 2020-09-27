import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import ReduxThunk from 'redux-thunk';
import combineReducers from './store/reducers/index';

const store = createStore(
	combineReducers,
	composeWithDevTools(applyMiddleware(ReduxThunk))
);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
