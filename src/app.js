import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Subreddit from './components/Subreddit';

const App = () => (
  <Router>
	<div>
		<Route exact path="/" component={Subreddit} />
		<Route path="/r/:subreddit" component={Subreddit}/>
	</div>
  </Router>
)

export default App;
