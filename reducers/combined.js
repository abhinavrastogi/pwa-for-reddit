import { combineReducers } from 'redux';
import postsBySubreddit from './postsReducer';
import commentsBySubreddit from './commentsReducer';

const rootReducer = combineReducers({
  postsBySubreddit,
  commentsBySubreddit
})

export default rootReducer
