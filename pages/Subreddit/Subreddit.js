import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import * as actions from '../../actions';
import { getCookieValue } from '../../utils';
import PostSummary from '../../components/PostSummary/PostSummary';
import Loader from '../../components/Loader/Loader';

import * as styles from './SubredditStyles.js';

class Subreddit extends Component {
    constructor() {
        super();
        window.iw = window.innerWidth;
    }
    componentDidMount() {
        const { dispatch, subreddit } = this.props;
        dispatch({
            type: actions.REQUEST_POSTS,
            subreddit: subreddit || (this.props.match && this.props.match.params && this.props.match.params.subreddit)
        })
    }

    render({posts, isFetching, subreddit, config}) {
        return <div {...styles.container}>
            {isFetching
                ? <Loader />
                : null}
            {!isFetching && posts && posts.data
                ? <div>
                    {posts.data.children.map(post => <PostSummary data={post.data} showSubreddit={post.data.subreddit!=subreddit} config={config} />)}
                </div>
                : null}
        </div>
    }
}

function mapStateToProps(state, props) {
    const { posts, config } = state;
    return {
        posts: posts.items,
        isFetching: posts.isFetching,
        config
    }
}

export default connect(mapStateToProps)(Subreddit);
