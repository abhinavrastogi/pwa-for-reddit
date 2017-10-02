import React, { Component } from 'react';
import glamorous from 'glamorous';

import Post from './Post';
import Header from './Header';

export default class List extends Component {
	constructor(props) {
		super(props);

		let cardView = window.localStorage.getItem('cardview');
		
		this.state = {
			subreddit: props.match.params.subreddit,
			cardView: (cardView && cardView === 'true'),
			loading: true
		};

		this.toggleCardView = this.toggleCardView.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			subreddit: nextProps.match.params.subreddit,
			loading: true
		})
	}

	componentDidMount() {
		const fetchUrl = this.state.subreddit ? `https://www.reddit.com/r/${this.state.subreddit}.json?raw_json=1` : 'https://www.reddit.com/.json?raw_json=1';

		fetch(fetchUrl).then(res => res.json()).then(res => {
			this.setState((prevState, props) => {
				return {
					posts: res.data.children.map(child => child.data),
					loading: false
				}
			});
		});
	}

	render() {
		return <div>
			<Header title={this.state.subreddit} toggleCardView={this.toggleCardView} cardView={this.state.cardView} />
			{this.state.posts && !this.state.loading
				? this.state.posts.map(post => <Post key={post.title} data={post} showFullImage={this.state.cardView} />)
				: <div className='loader'>Fetching Posts...</div>}
		</div>
	}

	toggleCardView() {
		this.setState({
			cardView: !this.state.cardView
		}, _ => {
			window.localStorage.setItem('cardview', this.state.cardView);
		})
	}
}

const Title = glamorous.div({
	marginBottom: '15px',
	fontSize: 'larger',
	textAlign: 'center'
})