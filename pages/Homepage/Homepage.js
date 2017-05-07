import { h, Component } from 'preact';
import Header from '../../components/Header/Header';
import Subreddit from '../Subreddit/Subreddit';

export default class Homepage extends Component {
    render() {
        return <Subreddit subreddit='frontpage' />
    }
}
