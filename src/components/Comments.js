import React, { Component } from 'react';

export default class Comments extends Component {
    componentDidMount() {
        let params = this.props.match.params;
		// fetch(`https://www.reddit.com/r/${params.subreddit}.json`, {
		// 	mode: 'cors'
		// })
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		this.setState({ data: data.data });
		// 	});
	}
    render() {
        return <div>comments</div>
    }
}