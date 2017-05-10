import { combineReducers } from 'redux';
import posts from './postsReducer';
import commentsBySubreddit from './commentsReducer';
import userInfo from './userReducer';
import title from './titleReducer';
import config from './configReducer';
import aboutSubreddit from './aboutSubredditReducer';

const rootReducer = combineReducers({
  posts,
  commentsBySubreddit,
  userInfo,
  title,
  config,
  aboutSubreddit
})

export default rootReducer
