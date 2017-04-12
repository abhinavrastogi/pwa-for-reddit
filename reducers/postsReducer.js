import {
    REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            let min = 1000000, max = 0;
            action.posts.data.children.map(post => {
                if(post.data.ups < min) {
                    min = post.data.ups;
                }
                if(post.data.ups > max) {
                    max = post.data.ups;
                }
            });
            let mid = (max - min)/2;
            const posts = action.posts;
            posts.data.children.map(post => {
                return Object.assign({}, post, {
                    medianScore: post.data.ups >= mid ? 1 : 0
                });
            });
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

export default function postsBySubreddit(state = { }, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
        return Object.assign({}, state, {
            [action.subreddit]: posts(state[action.subreddit], action)
        })
        default:
        return state
    }
}