const comments = (state = {post: {}, comments: [], loading: true}, action) => {
	switch (action.type) {
		case 'GET_COMMENTS_REQUEST':
			return Object.assign({}, state, {
				post: {},
				comments: [],
				loading: true
			})
		case 'GET_COMMENTS_SUCCESS':
			return Object.assign({}, state, {
				post: action.payload.post,
				comments: action.payload.comments,
				loading: false
			})
		default:
			return state
	}
}

export default comments