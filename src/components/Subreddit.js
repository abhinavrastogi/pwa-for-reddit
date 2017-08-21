import React, { Component } from 'react';

export default class Subreddit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			subreddit: this.props.match.params.subreddit ? `r/${this.props.match.params.subreddit}` : '',
			title: this.props.match.params.subreddit || 'Popular'
		};
	}
	componentDidMount() {
		fetch(`https://www.reddit.com/${this.state.subreddit}.json`, {
			mode: 'cors'
		})
			.then(res => res.json())
			.then(data => {
				this.setState({ data: data.data });
			});
	}
	render () {
		return <div>
			<h3>{this.state.title}</h3>
			{this.state.data 
			? <ul>
				{this.state.data.children.map(item => <li>{item.data.title}</li>)}
			</ul> 
			: <div>
				Loading
			</div>}
		</div>;
	}
}