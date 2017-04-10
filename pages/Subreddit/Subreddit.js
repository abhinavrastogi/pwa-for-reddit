import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import * as actions from 'actions';

import Header from 'components/Header/Header';
import PostSummary from 'components/PostSummary/PostSummary';

// import * as styles from './SubredditStyles.js';

class Subreddit extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: actions.REQUEST_POSTS,
            subreddit: this.props.subreddit
        });
    }

    render() {
        return <div>
            <Header />
            {this.props.isFetching
                ? 'Loading...'
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
    } = postsBySubreddit[props.subreddit] || {
        isFetching: true,
        items: []
    }

    return {
        posts,
        isFetching
    }
}

export default connect(mapStateToProps)(Subreddit);
