import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import cx from 'classnames';

import RHS from './RHS';

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
		const thumbsToHide = ['self']
		return <div>
			<nav className='header'>r/{this.state.title}</nav>
			<section className='container'>
				<div className='subreddit-list'>
					{this.state.data && this.state.data.children.map(item => <Link className='list-item' to={item.data.permalink}>
						{thumbsToHide.indexOf(item.data.thumbnail) < 0 ? <div className='img'><img src={item.data.thumbnail} width={50} /></div> : null }
						<div className='content'>
							{!item.data.stickied ? <div className='gray small subtitle'>/r/{item.data.subreddit}</div> : null}
							<div className={cx({'margin-tb': !item.data.stickied})}>{item.data.title}</div>
							{!item.data.stickied ? <div className='gray small subtitle'>/u/{item.data.author} 2h</div> : null}
						</div>
						<div className='small votes'>{item.data.score}<br/>{item.data.num_comments}</div>
					</Link>)}
				</div>
				<Route path={`${this.props.match.url}/comments/:id/:title_slug`} component={RHS}/>
			</section>
		</div>;
	}
}