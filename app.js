import { h, render, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'preact-redux';
import configureStore from './configureStore';
import reset from 'glamor/reset';

import Homepage from 'pages/Homepage/Homepage';
import Subreddit from 'pages/Subreddit/Subreddit';
import Comments from 'pages/Comments/Comments';

const store = configureStore();
const App = () => (
    <Provider store={store}>
        <Router>
            <Homepage path='/' />
            <Subreddit path='/r/:subreddit' />
            <Comments path='/r/:subreddit/comments/:post_id/:post_title' />
        </Router>
    </Provider>
)

render(<App />, document.getElementById('root'));
