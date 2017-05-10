import {
    REQUEST_ABOUT_SUBREDDIT, RECEIVE_ABOUT_SUBREDDIT, FAILED_REQUEST_ABOUT_SUBREDDIT, REQUEST_POSTS
} from '../actions'

export default function posts(state = {
    isFetching: false,
    data: {}
}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                data: {}
            })
        case REQUEST_ABOUT_SUBREDDIT:
            return Object.assign({}, state, {
                isFetching: true,
                data: {}
            })
        case RECEIVE_ABOUT_SUBREDDIT:
            return Object.assign({}, state, {isFetching: false}, action.data)
        case FAILED_REQUEST_ABOUT_SUBREDDIT:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                data: {}
            })
        default:
            return state
    }
}
