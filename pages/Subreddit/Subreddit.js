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
        window.iw = window.innerWidth - 1;
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        const { dispatch, subreddit } = this.props;
        const ignoreAbout = ['frontpage', 'popular'];

        dispatch({
            type: actions.REQUEST_POSTS,
            subreddit: subreddit || (this.props.match && this.props.match.params && this.props.match.params.subreddit)
        });
        ignoreAbout.indexOf(subreddit) < 0 && dispatch({
            type: actions.REQUEST_ABOUT_SUBREDDIT,
            subreddit: subreddit || (this.props.match && this.props.match.params && this.props.match.params.subreddit)
        })
    }
    loadMore() {
      const { dispatch, subreddit, after, match } = this.props;
      dispatch({
          type: actions.REQUEST_POSTS,
          subreddit: subreddit || (match && match.params && match.params.subreddit),
          after: after
      });
    }
    render({posts, isFetching, subreddit, config}) {
        return <div {...styles.container}>
            {posts
                ? <div>
                    {posts.map(post => <PostSummary data={post.data} showSubreddit={post.data.subreddit!=subreddit} config={config} />)}
                    {!isFetching ? <a {...styles.loadMore} onClick={this.loadMore}>Load More</a> : null}
                </div>
                : null}
            {isFetching
                ? <Loader />
                : null}
        </div>
    }
}

function mapStateToProps(state, props) {
    const { posts, config } = state;
    return {
        posts: posts.items,
        isFetching: posts.isFetching,
        after: posts.after,
        config
    }
}

export default connect(mapStateToProps)(Subreddit);
