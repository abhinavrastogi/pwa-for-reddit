import { combineReducers } from 'redux';
import postsBySubreddit from './postsReducer';
import commentsBySubreddit from './commentsReducer';
import userInfo from './userReducer';
import title from './titleReducer';

const rootReducer = combineReducers({
  postsBySubreddit,
  commentsBySubreddit,
  userInfo,
  title
})

export default rootReducer
