const subreddit = (state = {}, action) => {
	switch (action.type) {
		case 'SELECT_SUBREDDIT':
			return Object.assign({}, state, {
				id: action.subreddit || '__default__',
				title: action.subreddit || ''
			})
		default:
			return state
	}
}

export default subreddit