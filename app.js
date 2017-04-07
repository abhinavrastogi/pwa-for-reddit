import { h, render, Component } from 'preact';
import { Router } from 'preact-router';
import configureStore from './configureStore';
import { Provider } from 'preact-redux';

import Homepage from './pages/Homepage/Homepage';
import Subreddit from './pages/Subreddit/Subreddit';

const store = configureStore();
const App = () => (
    <Provider store={store}>
        <Router>
            <Homepage path='/' />
            <Subreddit path='/r/:subreddit' />
        </Router>
    </Provider>
)

render(<App />, document.getElementById('root'));
