import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import * as actions from '../../actions';
import { getCookieValue } from '../../utils';
import PostSummary from '../../components/PostSummary/PostSummary';

import * as styles from './SubredditStyles.js';

class Subreddit extends Component {
    constructor() {
        super();
        window.iw = window.innerWidth;
    }
    componentDidMount() {
        const { dispatch, subreddit } = this.props;
        subreddit === 'frontpage' && getCookieValue('access_token')
        ? dispatch({
            type: actions.REQUEST_FRONT_PAGE
        })
        : dispatch({
            type: actions.REQUEST_POSTS,
            subreddit: subreddit || (this.props.match && this.props.match.params && this.props.match.params.subreddit)
        })
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
    const { posts, isFetching } = state

    return {
        posts: posts.items,
        isFetching
    }
}

export default connect(mapStateToProps)(Subreddit);
