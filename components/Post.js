import React from 'react';
import glam from 'glamorous';
import {Link} from 'react-router-dom';

import {formatTimeAgo} from './utils';

const ignoredThumbs = ['default', 'self', 'nsfw', 'image'];

export default class Post extends React.Component {
	componentDidMount() {
		this.img && window.observer.observe(this.img);
	}
	render() {
		const {data, showFullImage, hideThumbnail} = this.props;

		return <PostContainer>
			<div style={{display: 'flex'}}>
				{ignoredThumbs.indexOf(data.thumbnail) < 0 && !hideThumbnail
					? <ThumbContainer>
						<img data-src={data.thumbnail} width={100} ref={ img => { this.img = img } } />
					</ThumbContainer>
					: null}
				<PostContent>
					<Meta>
						<SubredditName>/r/{data.subreddit}</SubredditName> &bull; {formatTimeAgo(data.created_utc)} ago &bull; u/{data.author}
					</Meta>
					<Title><Link to={data.permalink} style={{color: '#eee'}}>{data.title}</Link></Title>
					<Meta>
						{Number(data.score).toLocaleString()} votes &bull; {Number(data.num_comments).toLocaleString()} comments
					</Meta>
				</PostContent>
			</div>
			{showFullImage && data.preview && data.preview.images
			? <img src={data.preview.images[0].source.url} width='100%' style={{marginTop: '10px'}} />
			: null}
		</PostContainer>
	}
}

const PostContainer = glam.div({
	marginBottom: '10px',
	paddingBottom: '10px',
	borderBottom: '1px dashed #444'
})

const ThumbContainer = glam.div({
	width: '110px'
})

const PostContent = glam.div({
	flex: 1
})

const Meta = glam.div({
	color: '#888',
	fontSize: 'smaller'
})

const SubredditName = glam.span({
	color: '#257ec1'
})

const Title = glam.div({
	margin: '5px 0'
})