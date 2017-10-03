import React, { Component } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';

import { getPosts } from '../actions/index';

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
		if(nextProps.subreddit != this.props.subreddit) {
			this.props.dispatch(getPosts(nextProps.subreddit));
		}
	}

	componentDidMount() {
		this.props.dispatch(getPosts(this.props.subreddit));
	}

	render() {
		const { posts, loading, match } = this.props;
		return <div>
			<Header title={match.params.subreddit} toggleCardView={this.toggleCardView} cardView={this.state.cardView} />
			{posts && !loading
				? posts.map(post => <Post key={post.title} data={post} showFullImage={this.state.cardView} />)
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

const mapStateToProps = state => {
	const { posts } = state

	return posts;
}

export default connect(mapStateToProps)(List);