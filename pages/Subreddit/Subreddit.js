import { h, Component } from 'preact';

export default class Subreddit extends Component {
    render() {
        return <div>
            Subreddit {this.props.subreddit}
        </div>
    }
}
