import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

import List from './components/List';
import Comments from './components/Comments';
import Header from './components/Header';

window.iw = window.innerWidth + 1;

const App = () => (
	<Router>
		<div>
			<Route exact path="/" component={List} />
			<Route exact path="/r/:subreddit" component={List} />
			<Route path="/r/:subreddit/comments/:id/:title" component={Comments} />
		</div>
	</Router>
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
			console.log('loading', entry);
			entry.target.src = entry.target.dataset.src;
			observer.unobserve(entry.target);
		}
	});
}, options);