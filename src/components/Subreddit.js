import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Comments from './Comments';

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
			<nav className='header'>{this.state.title}</nav>
			<section className='container'>
				<div className='subreddit-list'>
					{this.state.data && this.state.data.children.map(item => <Link className='list-item' to={item.data.permalink}>
						<div className='img'><img src={item.data.thumbnail} width={50} /></div>
						<div className='content'>
							<div className='title'>{item.data.title}</div>
							<div className='gray small subtitle'>/u/{item.data.author}</div>
							<div className='gray small subtitle'>/r/{item.data.subreddit} 2h</div>
						</div>
						<div className='small votes'>{item.data.score}<br/>{item.data.num_comments}</div>
					</Link>)}
				</div>
				<article className='article'>blah</article>
				<article className='comments'>
					<Route path={`${this.props.match.url}/comments/:id/:title_slug`} component={Comments}/>
				</article>
			</section>
		</div>;
	}
}