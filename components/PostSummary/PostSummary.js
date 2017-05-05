import { h, Component } from 'preact';

import * as styles from './PostSummaryStyles';

const formatToK = num => num < 1000 ? num : (Math.floor(num/100)*100)/1000 + 'k';

const formatTimeAgo = timestamp => {
    const currentTime = Math.floor(Date.now()/1000);
    const timeAgo = currentTime - timestamp;
    let postfix = ' ago';

    if(timeAgo < 60) return `${timeAgo}s${postfix}`
    else if(timeAgo < 60*60) return `${Math.round(timeAgo/60)}m${postfix}`
    else if(timeAgo < 60*60*24) return `${Math.round(timeAgo/(60*24))}h${postfix}`
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
        const ignoredThumbnails = ['self', 'default', 'spoiler', 'nsfw', ''];

        return <div {...styles.container}>
                <div {...styles.titleRow}>
                  <a {...styles.votes}>{formatToK(data.ups)}</a>
                  <div {...styles.title}>{data.title}</div>
                </div>
                {data.preview ? <div {...styles.imageContainer(fullImage || data.preview.images[0].source.height < 500)} onClick={this.toggleImage}>
                  <img src={data.preview.images[0].source.url} {...styles.image} />
                  {!fullImage && data.preview.images[0].source.height > 500 ? <div {...styles.shade} /> : null}
                </div> : null }
                <div {...styles.links}>
                    By <a {...styles.linkItem}>{`u/${data.author}`}</a>
                    in {showSubreddit ? <a {...styles.linkItem}>{`r/${data.subreddit}`}</a> : null }
                    posted <span {...styles.linkItem}>{formatTimeAgo(data.created_utc)}</span>
                    having <a {...styles.linkItem} href={data.permalink}>{formatToK(data.num_comments)} <img src='images/comments.png' {...styles.iconComments} /></a>
                </div>
        </div>
    }
}
