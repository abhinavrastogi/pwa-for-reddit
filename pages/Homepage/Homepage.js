import { h, Component } from 'preact';
import Header from '../../components/Header/Header';
import Subreddit from '../Subreddit/Subreddit';
import { getCookieValue } from '../../utils';

export default class Homepage extends Component {
    render() {
        const defaultSubreddit = getCookieValue('access_token') ? 'frontpage' : 'popular';
        return <Subreddit subreddit={defaultSubreddit} />
    }
}
