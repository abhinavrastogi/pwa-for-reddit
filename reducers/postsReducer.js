const posts = (state = {posts: [], loading: true}, action) => {
	switch (action.type) {
		case 'GET_POSTS_REQUEST':
			return Object.assign({}, state, {
				posts: [],
				loading: true
			})
		case 'GET_POSTS_SUCCESS':
			return Object.assign({}, state, {
				posts: action.payload,
				loading: false
			})
		default:
			return state
	}
}

export default posts