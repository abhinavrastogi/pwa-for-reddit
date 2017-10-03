export const getPosts = subreddit => (dispatch, getState) => {
	dispatch({
		type: 'GET_POSTS_REQUEST'
	});

	const fetchUrl = subreddit ? `https://www.reddit.com/r/${subreddit}.json?raw_json=1` : 'https://www.reddit.com/.json?raw_json=1';

	return fetch(fetchUrl)
		.then(res => res.json())
		.then(res => {
			return dispatch({
				type: 'GET_POSTS_SUCCESS',
				payload: res.data.children.map(child => child.data)
			})
		});
}