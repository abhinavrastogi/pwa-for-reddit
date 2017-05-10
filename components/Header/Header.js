import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import * as styles from './HeaderStyles.js';
import * as actions from '../../actions';

class Header extends Component {
    constructor() {
        super();
        this.toggleImages = this.toggleImages.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: actions.REQUEST_USER
        });
    }
    toggleImages() {
        this.props.dispatch({type: actions.TOGGLE_IMAGES});
    }
    openSubreddit(e) {
        e.preventDefault();
        let inp = document.querySelector('input', e);
        let sr = inp.value.trim();
        sr && (window.location = `/r/${sr}`);
    }
    render({ userInfo, title }) {
        return <div {...styles.headerContainer}>
            <div {...styles.title}>{title.text}</div>
            <form onSubmit={this.openSubreddit}>
                <input type='text' {...styles.inputSubreddit} placeholder='open subreddit' />
            </form>
            <label {...styles.sswitch}>
              <input type="checkbox" onClick={this.toggleImages} />
              <div {...styles.slider}></div>
            </label>
            {userInfo.isFetching ? <span {...styles.user}>...</span> : null}
            {!userInfo.isFetching && userInfo.name ? <span {...styles.user}>{userInfo.name}</span> : null}
            {!userInfo.isFetching && !userInfo.name ? <a {...styles.user} href='https://www.reddit.com/api/v1/authorize.compact?client_id=u9-0jmBsXJw4tQ&response_type=code&state=RANDOM_STRING&redirect_uri=https%3A%2F%2Fpwa-for-reddit.herokuapp.com%2Fauth&duration=permanent&scope=read,vote,identity,mysubreddits'>Login</a> : null}
        </div>
    }
}

function mapStateToProps(state, props) {
    const { userInfo, title } = state

    return { userInfo, title }
}

export default connect(mapStateToProps)(Header);
