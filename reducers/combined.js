import { combineReducers } from 'redux';
import posts from './postsReducer';
import commentsBySubreddit from './commentsReducer';
import userInfo from './userReducer';
import title from './titleReducer';
import config from './configReducer';

const rootReducer = combineReducers({
  posts,
  commentsBySubreddit,
  userInfo,
  title,
  config
})

export default rootReducer
