import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import * as styles from './HeaderStyles.js';
import * as actions from '../../actions';

class Header extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: actions.REQUEST_USER
        });
    }
    render({name}) {
        return <div {...styles.headerContainer}>
            <div {...styles.title}>{this.props.title}</div>
            {name ? name : <a {...styles.user} href='https://www.reddit.com/api/v1/authorize.compact?client_id=u9-0jmBsXJw4tQ&response_type=code&state=RANDOM_STRING&redirect_uri=http%3A%2F%2Fpwa-for-reddit.herokuapp.com%2Fauth&duration=permanent&scope=read,vote,identity'>Login</a>}
        </div>
    }
}

function mapStateToProps(state, props) {
    const { userInfo } = state

    return userInfo
}

export default connect(mapStateToProps)(Header);
