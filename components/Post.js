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
		let thumb_height;

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

		if(data.thumbnail && data.thumbnail_height && data.thumbnail_width) {
			let thumb_aspect_ratio = data.thumbnail_height / data.thumbnail_width;
			thumb_height = thumb_aspect_ratio * 100;
		}

		return <PostContainer>
			<div style={{ display: 'flex' }}>
				<PostContent>
					<Link to={data.permalink}><Title>{data.title}</Title></Link>
					{data.selftext
						? <SelfText showFullSelfText={showFullSelfText}>
							{showFullSelfText
								? <ReactMarkdown source={data.selftext} />
								: data.selftext
							}
						</SelfText>
						: null}
					<Meta>
						<Link to={`/r/${data.subreddit}`}><SubredditName>/r/{data.subreddit}</SubredditName></Link> &bull; {formatTimeAgo(data.created_utc)} ago
					</Meta>
					<Meta>
						{Number(data.score).toLocaleString()} votes &bull; {Number(data.num_comments).toLocaleString()} comments
					</Meta>
				</PostContent>
				{data.thumbnail && ignoredThumbs.indexOf(data.thumbnail) < 0 && !hideThumbnail
					? <ThumbContainer onClick={this.toggleFullImage}>
						<img data-src={data.thumbnail} height={thumb_height} ref={img => { this.thumb = img }} style={{ borderRadius: '8px' }} />
						{gif_url || mp4_url ? <PlaySymbol>►</PlaySymbol> : null}
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
	marginBottom: '12px',
	paddingBottom: '12px'
})

const ThumbContainer = glam.div({
	width: '100px',
	padding: '0 5px',
	position: 'relative'
})

const PostContent = glam.div({
	flex: 1,
	padding: '0 5px'
})

const Meta = glam.div({
	color: '#888',
	fontSize: 'smaller',
	padding: '0 0 8px 0'
})

const SubredditName = glam.span({
	color: '#6495ed',
	padding: '5px 0'
})

const Title = glam.div({
	padding: '0 0 8px 0'
})

const SelfText = glam.div({
	fontSize: 'smaller',
	color: '#888',
	marginBottom: '8px',
	overflow: 'hidden',
	maxWidth: '100vw'
}, ({ showFullSelfText }) => ({
	maxHeight: showFullSelfText ? 'auto' : '45px'
}))

const FullImg = glam.img({
	marginTop: '10px',
	width: '100%'
})

const PlaySymbol = glam.div({
	position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    background: 'rgba(0,0,0,0.6)',
    padding: '10px 11px 10px 13px',
    borderRadius: '20px',
    fontSize: '12px'
})