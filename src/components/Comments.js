import React, { Component } from 'react';

const Comment = ({dat, level}) => (
	<li className='comments-list-item'>
		<div className='comment-body'>
			<div className='small gray comment-meta'>{dat.author} 2h {dat.score}</div>
			<div>{dat.body}</div>
		</div>
		{level < 2 ? <ul className='comments-list'>
			{dat.replies && dat.replies.data.children.map((c, i) => <Comment dat={c.data} level={level+1} key={level + '-' + i} />)}
		</ul> : null}
	</li>
)

export default class Comments extends Component {
    render() {
        return <div className='comments'>
			<ul className='comments-list'>
				{this.props.data.children.map((c, i) => <Comment dat={c.data} level={0} key={'0' + i} />)}
			</ul>
		</div>
    }
}