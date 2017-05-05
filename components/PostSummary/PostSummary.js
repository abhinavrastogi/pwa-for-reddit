import { h, Component } from 'preact';

import * as styles from './PostSummaryStyles';

const formatToK = num => num < 1000 ? num : (Math.floor(num/100)*100)/1000 + 'k';

const formatTimeAgo = timestamp => {
    const currentTime = Math.floor(Date.now()/1000);
    const timeAgo = currentTime - timestamp;
    let postfix = ' ago';

    if(timeAgo < 60) return `${timeAgo}s${postfix}`
    else if(timeAgo < 60*60) return `${Math.round(timeAgo/60)}m${postfix}`
    else if(timeAgo < 60*60*24) return `${Math.round(timeAgo/(60*60))}h${postfix}`
    else if(timeAgo < 60*60*24*365) return `${Math.round(timeAgo/(60*60*24))}d${postfix}`
}

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
        let img_url = '', img_type = '', img_height;
        if(data.preview) {
            let aspect_ratio = data.preview.images[0].source.height / data.preview.images[0].source.width;
            img_height = aspect_ratio * window.iw;
        }
        if(data.preview && data.preview.images[0].variants && data.preview.images[0].variants.gif) {
            img_url = data.preview.images[0].variants.gif.source.url;
            img_type = 'gif';
        } else if(data.preview) {
            img_url = data.preview.images[0].source.url;
            img_type = 'img';
        }

        return <div {...styles.container}>
                <div {...styles.titleRow}>
                  <a {...styles.votes}>{formatToK(data.ups)}</a>
                  <div {...styles.title}>{data.title}</div>
                </div>
                {img_url && img_type === 'img' ? <div {...styles.imageContainer(fullImage || img_height < 600)} onClick={this.toggleImage}>
                  <img src={img_url} {...styles.image} />
                  {!fullImage && img_height > 600 ? <div {...styles.shade} /> : null}
                </div> : null }
                <div {...styles.links}>
                    By <span {...styles.linkItem}>{`u/${data.author}`}</span>
                    in {showSubreddit ? <a {...styles.linkItem} href={data.subreddit_name_prefixed}>{data.subreddit_name_prefixed}</a> : null }
                    posted <span {...styles.linkItem}>{formatTimeAgo(data.created_utc)}</span>
                    having <a {...styles.linkItem} href={data.permalink}>{formatToK(data.num_comments)} <img src='/images/comments.png' {...styles.iconComments} /></a>
                </div>
        </div>
    }
}
