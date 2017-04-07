import { combineReducers } from 'redux';
import postsBySubreddit from 'reducers/postsReducer';
import commentsBySubreddit from 'reducers/commentsReducer';

const rootReducer = combineReducers({
  postsBySubreddit,
  commentsBySubreddit
})

export default rootReducer
