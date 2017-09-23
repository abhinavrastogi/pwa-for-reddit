import React, { Component } from 'react';
import glam from 'glamorous';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuOpen: false
		}

		this.toggleMenu = this.toggleMenu.bind(this);
		this.toggleCardView = this.toggleCardView.bind(this);
	}
	render() {
		return <HeaderContainer>
			<Title>{this.props.title || 'Reddit Reader'}</Title>
			<MenuContainer>
				<MenuIcon onClick={this.toggleMenu}>☰</MenuIcon>
				{this.state.menuOpen ? <MenuContent>
					<MenuItem onClick={this.toggleCardView}>{this.props.cardView ? 'Compact View' : 'Card View	'}</MenuItem>
					{/* <MenuItem>Day Theme</MenuItem> */}
				</MenuContent> : null}
			</MenuContainer>
		</HeaderContainer>
	}
	toggleMenu() {
		this.setState({
			menuOpen: !this.state.menuOpen
		})
	}
	toggleCardView() {
		this.toggleMenu();
		this.props.toggleCardView();
	}
}

const HeaderContainer = glam.div({
	fontSize: 'larger',
	lineHeight: 1,
	position: 'relative',
	display: 'flex',
	borderBottom: '1px dashed #444',
	marginBottom: '10px'
})

const Title = glam.div({
	padding: '17px 0',
	flex: 1
})

const MenuIcon = glam.div({
	padding: '17px'
})

const MenuContainer = glam.div({
	width: '50px'
})

const MenuContent = glam.ul({
	position: 'absolute',
	right: 0,
	width: '50%',
	background: '#333',
	margin: 0,
	listStyle: 'none',
	padding: 0,
	fontSize: 'smaller'
})

const MenuItem = glam.li({
	padding: '20px',
	textAlign: 'center',
	borderBottom: '1px solid #000'
})