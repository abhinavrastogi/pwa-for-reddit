import { h, Component } from 'preact';

import * as styles from './HeaderStyles.js';

export default class Header extends Component {
    render() {
        return <div {...styles.headerContainer}>
            <div {...styles.title}>{this.props.title}</div>
            <a {...styles.user} href='https://www.reddit.com/api/v1/authorize.compact?client_id=u9-0jmBsXJw4tQ&response_type=code&state=RANDOM_STRING&redirect_uri=http%3A%2F%2Fpwa-for-reddit.herokuapp.com%2Fauth&duration=permanent&scope=read,vote,identity'>Login</a>
        </div>
    }
}
