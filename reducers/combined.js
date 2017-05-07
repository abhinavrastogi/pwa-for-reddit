import { combineReducers } from 'redux';
import posts from './postsReducer';
import commentsBySubreddit from './commentsReducer';
import userInfo from './userReducer';
import title from './titleReducer';

const rootReducer = combineReducers({
  posts,
  commentsBySubreddit,
  userInfo,
  title
})

export default rootReducer
