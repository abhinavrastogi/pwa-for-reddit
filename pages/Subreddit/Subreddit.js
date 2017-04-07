import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { fetchPosts } from '../../actions';

import Header from '../../components/Header/Header';

class Subreddit extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchPosts(this.props.subreddit))
    }

    render() {
        return <div>
            <Header />
            {this.props.isFetching
                ? 'Loading...'
                : null}
            {!this.props.isFetching && this.props.posts
                ? <ul>
                    {this.props.posts.map(post => <li>{post}</li>)}
                </ul>
                : null}
        </div>
    }
}

function mapStateToProps(state, props) {
    const { postsBySubreddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[props.subreddit] || {
        isFetching: true,
        items: []
    }

    return {
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(Subreddit);
