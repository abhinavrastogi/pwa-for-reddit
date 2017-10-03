import { combineReducers } from 'redux'
import posts from './postsReducer'
import comments from './commentsReducer'

const redditApp = combineReducers({
  posts,
  comments
})

export default redditApp