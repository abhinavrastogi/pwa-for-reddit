import React, { Component } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';

import { getPosts, selectSubreddit } from '../actions/index';

import Post from './Post';
import Header from './Header';

class List extends Component {
	constructor(props) {
		super(props);

		let cardView = window.localStorage.getItem('cardview');
		
		this.state = {
			cardView: (cardView && cardView === 'true')
		};

		this.toggleCardView = this.toggleCardView.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.match.params.subreddit != this.props.match.params.subreddit) {
			// this.props.dispatch(getPosts(nextProps.match.params.subreddit));
			this.props.dispatch(selectSubreddit(nextProps.match.params.subreddit))
		}
	}

	componentDidMount() {
		// this.props.dispatch(getPosts(this.props.match.params.subreddit));
		this.props.dispatch(selectSubreddit(this.props.match.params.subreddit))
	}

	render() {
		const { posts, loading, match, title } = this.props;
		return <div>
			<Header title={title} toggleCardView={this.toggleCardView} cardView={this.state.cardView} />
			{posts && !loading
				? posts.map(post => !post.over_18 ? <Post key={post.title} data={post} showFullImage={this.state.cardView} hideThumbnail={!this.state.cardView} /> : null)
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

const mapStateToProps = (state, props) => {
	const { posts, selectedSubreddit } = state

	return {
		posts: posts.posts[selectedSubreddit.id],
		loading: posts.loading,
		subreddit: selectedSubreddit.id,
		title: selectedSubreddit.title
	};
}

export default connect(mapStateToProps)(List);