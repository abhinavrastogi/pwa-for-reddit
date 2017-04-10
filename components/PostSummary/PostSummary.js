import { h, Component } from 'preact';

import * as styles from './PostSummaryStyles';

export default class PostSummary extends Component {
    render() {
        const ignoredThumbnails = ['self', 'default', 'spoiler', ''];

        return <div {...styles.container}>
            <div {...styles.image}>{ignoredThumbnails.indexOf(this.props.data.thumbnail) === -1 ? <img src={this.props.data.thumbnail} width={75} /> : null }</div>
            <div {...styles.content}>
                {this.props.showSubreddit ? <a {...styles.linkSubreddit} {...styles.sublinks}>{`/r/${this.props.data.subreddit}`}</a> : null }
                <div {...styles.title}>{this.props.data.title}</div>
                <div {...styles.links}>
                    <a {...styles.votes} {...styles.sublinks}><span {...styles.upvoteIcon}>&#10148;</span> {Number(this.props.data.ups).toLocaleString()}</a>
                    <a {...styles.linkComments} {...styles.sublinks} href={this.props.data.permalink}>{Number(this.props.data.num_comments).toLocaleString()} Comments</a>
                    <a {...styles.linkAuthor} {...styles.sublinks}>{`/u/${this.props.data.author}`}</a>
                </div>
            </div>
        </div>
    }
}
