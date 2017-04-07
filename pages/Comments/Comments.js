import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import * as actions from 'actions';

class Comment extends Component {
    render() {
        return <li>
                {this.props.data.body}
                <ul>
                    {this.props.data.replies
                        ? this.props.data.replies.data.children.map(comment => comment.kind === 't1' ? <Comment data={comment.data} /> : null)
                        : null
                    }
                </ul>
            </li>
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
            ? <div>
                {this.props.comments[0].data.children[0].data.ups} | {this.props.comments[0].data.children[0].data.title}
                <hr/>
                <ul>
                    {this.props.comments[1].data.children.map(comment => <Comment data={comment.data} />)}
                </ul>
            </div>
            : 'loading'
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
