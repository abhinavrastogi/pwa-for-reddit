import { h, Component } from 'preact';

export default class Header extends Component {
    render() {
        return <div>
            Header<br/>
            <a href='/'>Home</a><br/>
            <a href='/r/hello'>Hello Subreddit</a>
            <hr/>
        </div>
    }
}
