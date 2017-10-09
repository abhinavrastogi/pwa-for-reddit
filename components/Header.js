import React, { Component } from 'react';
import glam from 'glamorous';
import { withRouter } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuOpen: false
		}

		this.toggleMenu = this.toggleMenu.bind(this);
		this.toggleCardView = this.toggleCardView.bind(this);
		this.openSubreddit = this.openSubreddit.bind(this);
	}
	render() {
		return <HeaderContainer>
			<Title>{this.props.title || 'Reddit Reader'}</Title>
			<MenuContainer>
				<MenuIcon onClick={this.toggleMenu}>☰</MenuIcon>
				{this.state.menuOpen ? <MenuContent>
					<MenuItem>
						<form onSubmit={this.openSubreddit} style={{margin: 0, padding: '10px'}}>
							<SearchBox type='text' placeholder="Enter Subreddit" id="inputSubreddit" autoComplete="off" autoCapitalize="none" autoCorrect="off" />
						</form>
					</MenuItem>
					<MenuItem onClick={this.toggleCardView}>
						<MenuItemContent>{this.props.cardView ? 'Compact View' : 'Card View	'}</MenuItemContent>
					</MenuItem>
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
		this.props.toggleCardView && this.props.toggleCardView();
	}
	openSubreddit(e) {
        e.preventDefault();
        let inp = document.querySelector('#inputSubreddit', e);
		let sr = inp.value.trim();
		sr && this.props.history.push(`/r/${sr}`);
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
	padding: '17px 5px',
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
	fontSize: 'smaller',
	zIndex: 1
})

const MenuItem = glam.li({
	textAlign: 'center',
	borderBottom: '1px solid #000'
})

const MenuItemContent = glam.div({
	padding: '20px'
})

const SearchBox = glam.input({
	border: '1px solid #666',
	outline: 'none',
	width: '100%',
	backgroundColor: '#333',
	color: '#fff',
	padding: '10px',
	fontSize: '14px'
})

export default withRouter(props => <Header {...props} />)