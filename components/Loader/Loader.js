import { h, Component } from 'preact';
import { css } from 'glamor';

const loading = css({
    textAlign: 'center',
    padding: '100px'
})

export default class Loader extends Component {
    render() {
        return <div {...loading}>Loading</div>
    }
}
