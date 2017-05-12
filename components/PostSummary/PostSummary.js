import { h, Component } from 'preact';
import { Link } from 'react-router-dom';
import Markup from 'preact-markup';

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
    render({data, showSubreddit, config}, {fullImage}) {
        let img_url = '', img_height, gif_url = '';
        const ignoreThumbs = ['default', 'self', 'nsfw', '', 'spoiler', 'image'];
        if(data.preview) {
            let aspect_ratio = data.preview.images[0].source.height / data.preview.images[0].source.width;
            img_height = aspect_ratio * window.iw;
            img_url = data.preview.images[0].source.url;
            if (data.preview.images[0].variants && data.preview.images[0].variants.gif) {
                gif_url = data.preview.images[0].variants.gif.source.url;
            }
        }
        const renderFooter = <div {...styles.postFooter} {...styles.postMeta}>
          <Link to={data.permalink} {...styles.metaItem} {...styles.footerComments}>{formatToK(data.num_comments)} Comments</Link>
          <span {...styles.metaItem}>&bull;</span>
          <span {...styles.votes} {...styles.metaItem}>{formatToK(data.ups)} votes</span>
        </div>;

        return <div {...styles.container} {...styles.sticky(data.stickied)}>
                <div {...styles.titleRow}>
                  {!config.showFullImages && ignoreThumbs.indexOf(data.thumbnail)<0 ? <div {...styles.thumb_container}><img src={data.thumbnail} width={70} onClick={this.toggleImage}/></div> : null }
                  <div {...styles.title}>
                    <div {...styles.postMeta}>
                        {showSubreddit ? <Link {...styles.metaItem} {...styles.blue} to={`/r/${data.subreddit}`}>{data.subreddit_name_prefixed}</Link> : null }
                        {showSubreddit ? <span {...styles.metaItem}>&bull;</span> : null}
                        {!data.stickied ? <span {...styles.metaItem}>{formatTimeAgo(data.created_utc)}</span> : null}
                        {!data.stickied ? <span {...styles.metaItem}>&bull;</span> : null}
                        <span {...styles.metaItem}>{`u/${data.author}`}</span>
                    </div>
                    <Link to={data.permalink} {...styles.titleText}>{data.title}</Link>
                    {!config.showSelfText && data.selftext && !data.stickied ? <Link {...styles.miniselftext} to={data.permalink}>{data.selftext}</Link> : null}
                    {!config.showFullImages && !config.showSelfText ? renderFooter : null}
                  </div>
                </div>
                {(config.showFullImages || fullImage) && img_url && data.post_hint === 'image' && !gif_url ? <div {...styles.imageContainer(true)} onClick={this.toggleImage}>
                  <img src={img_url} {...styles.image} />
                </div> : null }
                {(config.showFullImages || fullImage) && gif_url ? <div {...styles.imageContainer(true)} onClick={this.toggleImage}>
                    <img src={gif_url} {...styles.image} />
                </div> : null }
                {(config.showFullImages || fullImage) && !gif_url && data.post_hint === 'link' ? <div {...styles.imageContainer(true)} onClick={this.toggleImage}>
                    <img src={img_url} {...styles.image} />
                </div> : null }
                {config.showSelfText && data.selftext ? <div {...styles.selftext}><Markup markup={data.selftext_html} type="html" /></div> : null}
                {config.showSelfText || config.showFullImages ? renderFooter : null}
        </div>
    }
}
