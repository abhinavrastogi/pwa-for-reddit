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
		let img_url = '', img_height, gif_url = '';

		if (data.preview) {
			let aspect_ratio = data.preview.images[0].source.height / data.preview.images[0].source.width;
			img_height = aspect_ratio * window.iw;
			img_url = data.preview.images[0].source.url;
			if (data.preview.images[0].variants && data.preview.images[0].variants.gif) {
				gif_url = data.preview.images[0].variants.gif.source.url;
			}
		}

		return <PostContainer>
			<div style={{ display: 'flex' }}>
				<PostContent>
					<Meta>
						<Link to={`/r/${data.subreddit}`}><SubredditName>/r/{data.subreddit}</SubredditName></Link> &bull; {formatTimeAgo(data.created_utc)} ago &bull; u/{data.author}
					</Meta>
					<Link to={data.permalink} style={{ color: '#eee' }}><Title>{data.title}</Title></Link>
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

			{showFullImage && img_url && data.post_hint === 'image' && !gif_url
				? <img width="100%" style={{marginTop: '10px'}} data-src={img_url} onClick={this.toggleFullImage} ref={img => { this.img = img }} />
				: null}
			{showFullImage && gif_url
				? <div onClick={this.toggleFullImage} style={{marginTop: '10px'}}>
					<img width="100%" data-src={gif_url} ref={img => { this.img = img }} />
				</div>
				: null}
			{showFullImage && !gif_url && data.post_hint === 'link' && img_url
				? <img width="100%" style={{marginTop: '10px'}} data-src={img_url} onClick={this.toggleFullImage} ref={img => { this.img = img }} />
				: null}
		</PostContainer>
	}
	toggleFullImage() {
		this.setState({
			showFullImage: !this.state.showFullImage
		}, _ => {
			this.thumb && window.observer.observe(this.thumb);
			this.img && window.observer.observe(this.img);
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
	color: '#0079d3',
	padding: '5px 0'
})

const Title = glam.div({
	padding: '5px 0'
})

const FullImg = glam.img({
	marginTop: '10px',
	width: '100%'
})