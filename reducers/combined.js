import { combineReducers } from 'redux';
import postsBySubreddit from './postsReducer';
import commentsBySubreddit from './commentsReducer';
import userInfo from './userReducer';

const rootReducer = combineReducers({
  postsBySubreddit,
  commentsBySubreddit,
  userInfo
})

export default rootReducer
