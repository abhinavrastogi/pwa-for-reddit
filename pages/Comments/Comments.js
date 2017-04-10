import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import PostSummary from 'components/PostSummary/PostSummary';
import * as actions from 'actions';

import * as styles from './CommentsStyles.js';
import * as postStyles from 'components/PostSummary/PostSummaryStyles.js';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReplies: false
        }
    }
    toggleReplies() {
        console.log('toggling', this.state);
        this.setState({
            showReplies: !this.state.showReplies
        });
    }
    render({data}) {
        return <div {...styles.comment}>
                <div {...styles.user}>{`/u/${this.props.data.author}`}</div>
                <div {...styles.text}>
                    {data.body}
                    {this.state.showReplies
                        ? <div>
                            {data.replies
                                ? data.replies.data.children.map(comment => comment.kind === 't1' ? <Comment data={comment.data} /> : null)
                                : null
                            }
                        </div>
                        : null
                    }
                </div>
                <div {...styles.postMeta}>
                    <span {...postStyles.upvoteIcon}>&#10148;</span> {Number(data.ups).toLocaleString()}
                    {data.replies.data ? <span {...styles.repliesCount} onClick={this.toggleReplies.bind(this)}>{Number(data.replies.data.children.length).toLocaleString()} Replies</span> : null}
                </div>
            </div>
    }
}

class Comments extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: actions.REQUEST_COMMENTS,
            subreddit: this.props.subreddit,
            post_id: this.props.post_id,
            post_title: this.props.post_title
        });
    }
    render() {
        return !this.props.isFetching
            ? <div {...styles.page}>
                <PostSummary data={this.props.comments[0].data.children[0].data} />
                {this.props.comments[1].data.children.map(comment => comment.kind === 't1' ? <Comment data={comment.data} /> : null)}
            </div>
            : 'Loading'
    }
}

function mapStateToProps(state, props) {
    const { commentsBySubreddit } = state
    const {
        isFetching,
        items: comments
    } = commentsBySubreddit[props.subreddit] || {
        isFetching: true,
        items: []
    }

    return {
        comments,
        isFetching
    }
}

export default connect(mapStateToProps)(Comments);
