import { combineReducers } from 'redux'
import posts from './postsReducer'
import comments from './commentsReducer'
import selectedSubreddit from './subredditReducer'

const redditApp = combineReducers({
  posts,
  comments,
  selectedSubreddit
})

export default redditApp