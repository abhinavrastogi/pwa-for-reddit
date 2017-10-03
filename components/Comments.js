import React, { Component } from 'react';
import glam from 'glamorous';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';

import { getComments } from '../actions/index';
import Post from './Post';
import { formatTimeAgo } from './utils';

class Comments extends Component {
	componentDidMount() {
		const { subreddit, id, title } = this.props.match.params;

		this.props.dispatch(getComments(subreddit, id, title));
	}
	render() {
		const { post, comments, loading } = this.props;

		return <div>
			{post.id
				? <Post data={post} showFullImage hideThumbnail showFullSelfText />
				: null}
			{comments.length
				? <TopComments>
					{comments.map(({ data }) => <Comment key={data.id} data={data} />)}
				</TopComments>
				: null}
			{loading
				? <div className='loader'>Loading comments...</div>
				: null}
		</div>
	}
}

const Comment = ({ data }) => <li>
	<CommentBody>
		<Meta>u/{data.author} &bull; {formatTimeAgo(data.created_utc)} &bull; {Number(data.score).toLocaleString()} votes &bull; {data.replies ? data.replies.data.children.length : '0'} replies</Meta>
		{data.body ? <ReactMarkdown source={data.body} /> : null}
	</CommentBody>
	{data.replies && data.replies.data.children.length && !data.collapsed
		? <Replies>
			{data.replies.data.children.filter(child => child.kind == 't1').map(({ data }) => <Comment key={data.id} data={data} />)}
		</Replies>
		: null}
</li>

const mapStateToProps = (state, props) => {
	const { posts, comments } = state

	let cachedPost = posts.posts.filter(post => post.id === props.match.params.id);

	return {
		post: (cachedPost.length && cachedPost[0]) || comments.post,
		comments: comments.comments,
		loading: comments.loading
	};
}

export default connect(mapStateToProps)(Comments);

const TopComments = glam.ul({
	listStyle: 'none',
	margin: 0,
	padding: 0
})

const Replies = glam.ul({
	listStyle: 'none',
	paddingLeft: '10px',
	marginLeft: '10px',
	borderLeft: '1px dashed #666'
})

const CommentBody = glam.div({
	padding: '0 10px 10px 10px',
	'& a': {
		color: 'red'
	},
	'& p:nth-child(1)': {
		marginTop: 0
	},
	'& p:nth-last-child(1)': {
		marginBottom: 0
	}
})

const Meta = glam.div({
	fontSize: '12px',
	color: '#888',
	marginBottom: '3px'
})