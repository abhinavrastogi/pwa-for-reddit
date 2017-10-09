export const getPosts = _ => (dispatch, getState) => {
	const { posts, selectedSubreddit } = getState();
	const subreddit = selectedSubreddit.id;

	if (posts.posts[subreddit] && posts.posts[subreddit].length) {
		return dispatch({
			type: 'GET_POSTS_CACHE_SUCCESS',
			payload: posts.posts[subreddit],
			subreddit
		})
	}

	dispatch({
		type: 'GET_POSTS_REQUEST'
	});

	const subredditSlug = selectedSubreddit.title;
	const fetchUrl = subredditSlug ? `https://www.reddit.com/r/${subredditSlug}.json?raw_json=1` : 'https://www.reddit.com/.json?raw_json=1';

	return fetch(fetchUrl)
		.then(res => res.json())
		.then(res => {
			return dispatch({
				type: 'GET_POSTS_SUCCESS',
				payload: res.data.children.map(child => child.data),
				subreddit
			})
		});
}

export const getComments = (subreddit, id, title) => (dispatch, getState) => {
	dispatch({
		type: 'GET_COMMENTS_REQUEST'
	});

	const fetchUrl = `https://www.reddit.com/r/${subreddit}/comments/${id}/${title}/.json?raw_json=1`;

	return fetch(fetchUrl)
		.then(res => res.json())
		.then(res => {
			return dispatch({
				type: 'GET_COMMENTS_SUCCESS',
				payload: {
					post: res[0].data.children[0].data,
					comments: res[1].data.children
				}
			})
		});
}

export const selectSubreddit = subreddit => dispatch => {
	dispatch({
		type: 'SELECT_SUBREDDIT',
		subreddit
	})

	return dispatch(getPosts());
}