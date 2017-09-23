import React, { Component } from 'react';
import glamorous from 'glamorous';

import Post from './Post';

export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			subreddit: props.match.params.subreddit
		};
	}

	componentDidMount() {

		const fetchUrl = this.state.subreddit ? `https://www.reddit.com/r/${this.state.subreddit}.json` : 'https://www.reddit.com/.json';

		fetch(fetchUrl).then(res => res.json()).then(res => {
			this.setState((prevState, props) => {
				return {
					posts: res.data.children.map(child => child.data)
				}
			});
		});
	}

	render() {
		return this.state.posts
			? <div>
				{this.state.subreddit
					? <Title>{this.state.subreddit}</Title>
					: null}
				{this.state.posts.map(post => <Post key={post.title} data={post} />)}
			</div>
			: <div className='loader'>Fetching Posts...</div>;
	}
}

const Title = glamorous.div({
	padding: '15px 0',
	fontSize: 'larger',
	textAlign: 'center'
})