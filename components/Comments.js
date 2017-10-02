import React, { Component } from 'react';
import glam from 'glamorous';
import ReactMarkdown from 'react-markdown';

import Post from './Post';
import {formatTimeAgo} from './utils';

export default class Comments extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {
		fetch(`https://www.reddit.com${this.props.location.pathname}.json?raw_json=1`).then(res => res.json()).then(res => {
			this.setState({
				post: res[0].data.children[0].data,
				comments: res[1].data.children
			})
		});
	}
	render() {
		return this.state.comments && this.state.post
			? <div>
				<Post data={this.state.post} showFullImage hideThumbnail showFullSelfText />
				<TopComments>
					{this.state.comments.map(({data}) => <Comment key={data.id} data={data} />)}
				</TopComments>
			</div>
			: <div className='loader'>Loading comments...</div>
	}
}

const Comment = ({data}) => <li>
	<CommentBody>
		<Meta>u/{data.author} &bull; {formatTimeAgo(data.created_utc)} &bull; {Number(data.score).toLocaleString()} votes &bull; {data.replies ? data.replies.data.children.length : '0'} replies</Meta>
		{data.body ? <ReactMarkdown source={data.body} /> : null}
	</CommentBody>
	{data.replies && data.replies.data.children.length && !data.collapsed
	? <Replies>
		{data.replies.data.children.filter(child => child.kind == 't1').map(({data}) => <Comment key={data.id} data={data} />)}	
	</Replies> 
	: null}
</li>

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