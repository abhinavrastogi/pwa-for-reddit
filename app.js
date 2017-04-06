import { h, render, Component } from 'preact';

class App extends Component {
	render() {
		return <div>Hello World</div>;
	}
}

render(<App />, document.getElementById('root'));
