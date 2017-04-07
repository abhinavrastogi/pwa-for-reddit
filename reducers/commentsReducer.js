import {
  REQUEST_COMMENTS, RECEIVE_COMMENTS
} from '../actions'

function comments(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.comments,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default function commentsBySubreddit(state = { }, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        [action.subreddit]: comments(state[action.subreddit], action)
      })
    default:
      return state
  }
}
