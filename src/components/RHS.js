import React, { Component } from 'react';

import Article from './Article';
import Comments from './Comments';

export default class RHS extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
    componentDidMount() {
		console.log('fetching', this.props.match.url);
		this.fetchComments();
	}
	componentWillReceiveProps() {
		console.log('fetching', this.props.match.url);
		this.fetchComments();
	}
	fetchComments() {
		let params = this.props.match.params;
		fetch(`https://www.reddit.com${this.props.match.url}.json?raw_json=1`, {
			mode: 'cors'
		})
			.then(res => res.json())
			.then(data => {
				console.log('done');
				this.setState({
					article: data[0].data.children[0].data,
					comments: data[1].data
				});
			});
	}
    render() {
		return <div className='rhs'>
			{this.state.article ? <Article data={this.state.article} /> : null }
			{this.state.comments ? <Comments data={this.state.comments} /> : null}
		</div>
    }
}