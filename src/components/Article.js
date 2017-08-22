import React, { Component } from 'react';

export default class RHS extends Component {
    render() {
		let images = this.props.data.preview.images[0].resolutions;
		let lastImage = images[images.length - 1];

		return <div className='article'>
			<img src={lastImage.url} width='100%' />
		</div>
    }
}