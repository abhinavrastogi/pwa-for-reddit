const posts = (state = {posts: {}, loading: true}, action) => {
	switch (action.type) {
		case 'GET_POSTS_REQUEST':
			return Object.assign({}, state, {
				loading: true
			})
		case 'GET_POSTS_SUCCESS':
		case 'GET_POSTS_CACHE_SUCCESS':
			return Object.assign({}, state, {
				posts: Object.assign({}, state.posts, {
					[action.subreddit]: action.payload
				}),
				loading: false
			})
		default:
			return state
	}
}

export default posts