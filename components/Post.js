import React from 'react';
import glam from 'glamorous';
import { Link } from 'react-router-dom';

import { formatTimeAgo } from './utils';

const ignoredThumbs = ['default', 'self', 'nsfw', 'image', 'spoiler'];

export default class Post extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showFullImage: this.props.showFullImage
		}

		this.toggleFullImage = this.toggleFullImage.bind(this);
	}
	componentDidMount() {
		this.thumb && window.observer.observe(this.thumb);
		this.img && window.observer.observe(this.img);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			showFullImage: nextProps.showFullImage
		}, _ => {
			this.thumb && window.observer.observe(this.thumb);
			this.img && window.observer.observe(this.img);
		})
	}
	render() {
		const { data, hideThumbnail } = this.props;
		const { showFullImage } = this.state;

		return <PostContainer>
			<div style={{ display: 'flex' }}>
				<PostContent>
					<Meta>
						<SubredditName>/r/{data.subreddit}</SubredditName> &bull; {formatTimeAgo(data.created_utc)} ago &bull; u/{data.author}
					</Meta>
					<Title><Link to={data.permalink} style={{ color: '#eee' }}>{data.title}</Link></Title>
					<Meta>
						{Number(data.score).toLocaleString()} votes &bull; {Number(data.num_comments).toLocaleString()} comments
					</Meta>
				</PostContent>
				{ignoredThumbs.indexOf(data.thumbnail) < 0 && !hideThumbnail
					? <ThumbContainer onClick={this.toggleFullImage}>
						<img data-src={data.thumbnail} width={100} ref={img => { this.thumb = img }} />
					</ThumbContainer>
					: null}
			</div>
			{showFullImage && data.preview && data.preview.images
				? <img data-src={data.preview.images[0].source.url}
					width='100%'
					style={{ marginTop: '10px' }}
					onClick={this.toggleFullImage}
					ref={img => { this.img = img }} />
				: null}
		</PostContainer>
	}
	toggleFullImage() {
		this.setState({
			showFullImage: !this.state.showFullImage
		})
	}
}

const PostContainer = glam.div({
	marginBottom: '10px',
	paddingBottom: '10px',
	borderBottom: '1px dashed #444'
})

const ThumbContainer = glam.div({
	width: '100px',
	padding: '0 5px'
})

const PostContent = glam.div({
	flex: 1,
	padding: '0 5px'
})

const Meta = glam.div({
	color: '#888',
	fontSize: '12px'
})

const SubredditName = glam.span({
	color: '#0079d3'
})

const Title = glam.div({
	margin: '5px 0'
})