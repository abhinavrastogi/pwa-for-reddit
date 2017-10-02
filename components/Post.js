import React from 'react';
import glam from 'glamorous';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

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
		const { data, hideThumbnail, showFullSelfText } = this.props;
		const { showFullImage } = this.state;
		let img_url = '', img_height, gif_url = '', mp4_url = '';

		if (data.preview) {
			let aspect_ratio = data.preview.images[0].source.height / data.preview.images[0].source.width;
			img_height = aspect_ratio * window.iw;
			let img_resolutions = data.preview.images[0].resolutions;
			img_url = img_resolutions[img_resolutions.length - 1].url;
			if (data.preview.images[0].variants && data.preview.images[0].variants.gif) {
				gif_url = data.preview.images[0].variants.gif.source.url;
			}
			if (data.preview.images[0].variants && data.preview.images[0].variants.mp4) {
				let mp4_resolutions = data.preview.images[0].variants.mp4.resolutions;
				mp4_url = mp4_resolutions[mp4_resolutions.length - 1].url;
			}
		}

		return <PostContainer>
			<div style={{ display: 'flex' }}>
				<PostContent>
					<Meta>
						<Link to={`/r/${data.subreddit}`}><SubredditName>/r/{data.subreddit}</SubredditName></Link> &bull; {formatTimeAgo(data.created_utc)} ago &bull; u/{data.author}
					</Meta>
					<Link to={data.permalink} style={{ color: '#eee' }}><Title>{data.title}</Title></Link>
					{data.selftext
						? <SelfText showFullSelfText={showFullSelfText}>
							{showFullSelfText
								? <ReactMarkdown source={data.selftext} />
								: data.selftext
							}

						</SelfText>
						: null}
					<Meta>
						{Number(data.score).toLocaleString()} votes &bull; {Number(data.num_comments).toLocaleString()} comments
					</Meta>
				</PostContent>
				{data.thumbnail && ignoredThumbs.indexOf(data.thumbnail) < 0 && !hideThumbnail
					? <ThumbContainer onClick={this.toggleFullImage}>
						<img data-src={data.thumbnail} width={100} ref={img => { this.thumb = img }} />
					</ThumbContainer>
					: null}
			</div>

			{showFullImage && (img_url || gif_url || mp4_url)
				? <div onClick={this.toggleFullImage} style={{ height: `${img_height}px`, marginTop: '10px' }}>
					{(img_url && !gif_url && !mp4_url) && <img width="100%" data-src={img_url} ref={img => { this.img = img }} />}
					{mp4_url && <video id="sampleMovie" width="100%" controls loop autoPlay><source src={mp4_url} type="video/mp4" /></video>}
				</div>
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
	fontSize: 'smaller'
})

const SubredditName = glam.span({
	color: '#6495ed',
	padding: '5px 0'
})

const Title = glam.div({
	padding: '5px 0'
})

const SelfText = glam.div({
	fontSize: 'smaller',
	color: '#bbb',
	marginBottom: '5px',
	overflow: 'hidden'
}, ({ showFullSelfText }) => ({
	maxHeight: showFullSelfText ? 'auto' : '45px'
}))

const FullImg = glam.img({
	marginTop: '10px',
	width: '100%'
})