import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import redditApp from './reducers/index';

import List from './components/List';
import Comments from './components/Comments';
import Header from './components/Header';

window.iw = window.innerWidth + 1;
const loggerMiddleware = createLogger();
const store = createStore(redditApp, applyMiddleware(thunkMiddleware, loggerMiddleware));

const App = () => (
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/" component={List} />
				<Route exact path="/r/:subreddit" component={List} />
				<Route path="/r/:subreddit/comments/:id/:title" component={Comments} />
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

const options = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1
}

window.observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.src = entry.target.dataset.src;
			observer.unobserve(entry.target);
		}
	});
}, options);