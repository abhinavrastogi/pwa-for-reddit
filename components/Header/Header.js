import { h, Component } from 'preact';

export default class Header extends Component {
    render() {
        return <div>
            <a href='/'>Home</a> <a href='/r/popular'>Popular</a>
            <hr/>
        </div>
    }
}
