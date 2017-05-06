import { h, render, Component } from 'preact';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'preact-redux';
import configureStore from './configureStore';

import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import Subreddit from './pages/Subreddit/Subreddit';
import Comments from './pages/Comments/Comments';

const store = configureStore();
const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <Route component={Homepage} exact path='/' />
                <Route component={Comments} path='/r/:subreddit/comments/:post_id/:post_title' />
                <Route component={Subreddit} exact path='/r/:subreddit' />
            </div>
        </Router>
    </Provider>
)

render(<App />, document.getElementById('root'));
