import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import * as actions from '../../actions';

import PostSummary from '../../components/PostSummary/PostSummary';

import * as styles from './SubredditStyles.js';

class Subreddit extends Component {
    constructor() {
        super();
        window.iw = window.innerWidth;
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: actions.REQUEST_POSTS,
            subreddit: this.props.subreddit || this.props.match.params.subreddit
        });
    }

    render() {
        return <div {...styles.container}>
            {this.props.isFetching
                ? <div {...styles.loading}>Loading</div>
                : null}
            {!this.props.isFetching && this.props.posts && this.props.posts.data
                ? <div>
                    {this.props.posts.data.children.map(post => <PostSummary data={post.data} showSubreddit={post.data.subreddit!=this.props.subreddit} />)}
                </div>
                : null}
        </div>
    }
}

function mapStateToProps(state, props) {
    const { postsBySubreddit } = state
    const {
        isFetching,
        items: posts
    } = postsBySubreddit[props.subreddit || props.match.params.subreddit] || {
        isFetching: true,
        items: []
    }

    return {
        posts,
        isFetching
    }
}

export default connect(mapStateToProps)(Subreddit);
