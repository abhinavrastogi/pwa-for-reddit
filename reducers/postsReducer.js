import {
    REQUEST_POSTS, RECEIVE_POSTS, FAILED_REQUEST_POSTS
} from '../actions'

export default function posts(state = {
    isFetching: false,
    items: [],
    after: null,
    subreddit: null
}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                items: action.subreddit === state.subreddit ? state.items : []
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.subreddit === state.subreddit ? state.items.concat(action.posts.data.children) : action.posts.data.children,
                after: action.posts.data.after,
                subreddit: action.subreddit
            })
        case FAILED_REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                error: true
            })
        default:
            return state
    }
}
