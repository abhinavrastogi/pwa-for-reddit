import { combineReducers } from 'redux'
import posts from './postsReducer'
// import comments from './comments'

const redditApp = combineReducers({
  posts
})

export default redditApp