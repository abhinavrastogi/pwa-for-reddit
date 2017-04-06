import { h, render, Component } from 'preact';
import { Router } from 'preact-router';

import Homepage from './pages/Homepage/Homepage';
import Subreddit from './pages/Subreddit/Subreddit';

import Header from './components/Header/Header';

const App = () => (
    <div>
        <Header />
        <Router>
            <Homepage path='/' />
            <Subreddit path='/r/:subreddit' />
        </Router>
    </div>
)

render(<App />, document.getElementById('root'));
