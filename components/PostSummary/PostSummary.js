import { h, Component } from 'preact';
import { Link } from 'react-router-dom';

import * as styles from './PostSummaryStyles';
import {formatToK, formatTimeAgo} from '../../utils';

export default class PostSummary extends Component {
    constructor() {
        super();
        this.state = {
            fullImage: false
        };
        this.toggleImage = this.toggleImage.bind(this);
    }
    toggleImage() {
        this.setState({
            fullImage: !this.state.fullImage
        });
    }
    render({data, showSubreddit}, {fullImage}) {
        let img_url = '', img_height, gif_url = '';
        if(data.preview) {
            let aspect_ratio = data.preview.images[0].source.height / data.preview.images[0].source.width;
            img_height = aspect_ratio * window.iw;
            img_url = data.preview.images[0].source.url;
            if (data.preview.images[0].variants && data.preview.images[0].variants.gif) {
                gif_url = data.preview.images[0].variants.gif.source.url;
            }
        }

        return <div {...styles.container}>
                <div {...styles.titleRow}>
                  {(gif_url || (data.post_hint === 'link' && data.thumbnail !== 'default')) ? <img src={data.thumbnail} {...styles.gif_thumb} onClick={this.toggleImage}/> : null }
                  <div {...styles.title}>
                    <div {...styles.postMeta}>
                        {showSubreddit ? <Link {...styles.metaItem} {...styles.blue} to={`/r/${data.subreddit}`}>{data.subreddit_name_prefixed}</Link> : null }
                        &bull;&nbsp;<span {...styles.metaItem}>{formatTimeAgo(data.created_utc)}</span>
                        &bull;&nbsp;<span {...styles.metaItem}>{`u/${data.author}`}</span>
                    </div>
                    <Link to={data.permalink} {...styles.titleText}>{data.title}</Link>
                    <div {...styles.postFooter}>
                      <span {...styles.comments}>{formatToK(data.num_comments)} Comments</span>
                      &nbsp;&bull;&nbsp;<span {...styles.votes}>{formatToK(data.ups)} votes</span>
                    </div>
                  </div>
                </div>
                {img_url && data.post_hint === 'image' && !gif_url ? <div {...styles.imageContainer(fullImage || img_height < 600)} onClick={this.toggleImage}>
                  <img src={img_url} {...styles.image} />
                  {!fullImage && img_height > 600 ? <div {...styles.shade} /> : null}
                </div> : null }
                {fullImage && gif_url ? <div {...styles.imageContainer(fullImage)} onClick={this.toggleImage}>
                    <img src={gif_url} {...styles.image} />
                </div> : null }
                {fullImage && !gif_url && data.post_hint === 'link' ? <div {...styles.imageContainer(fullImage)} onClick={this.toggleImage}>
                    <img src={img_url} {...styles.image} />
                </div> : null }
        </div>
    }
}
