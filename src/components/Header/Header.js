import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/userActions';
import { logoutUserApi } from '../../apiActions/authApi';
const Header = (props) => {
	const history = useHistory();
	const jwt = localStorage.getItem('jwt');
	const [page, setPage] = useState([
		{
			name: 'Home',
			linkTo: '/',
			public: true,
		},
		{
			name: 'Guitars',
			linkTo: '/shop',
			public: true,
		},
	]);
	const [user, setUser] = useState([
		{
			name: 'My cart',
			linkTo: '/user/cart',
			public: false,
		},
		{
			name: 'My account',
			linkTo: 'user/dashboard',
			public: false,
		},
		{
			name: 'Log In',
			linkTo: '/login',
			public: true,
		},
		{
			name: 'logout',
			linkTo: '/logout',
			public: false,
		},
	]);
	const logoutHandler = async () => {
		const data = await logoutUserApi();
		if (data.success) {
			props.logoutUser();
			localStorage.clear();
			history.push('/');
		} else {
			console.log(data.errorMessage);
		}
	};
	const defaultLink = (item, i) => {
		if (item.name === 'logout') {
			return (
				<div className="log_out_link" key={i} onClick={logoutHandler}>
					{item.name}
				</div>
			);
		}
		return (
			<Link to={item.linkTo} key={i}>
				{item.name}
			</Link>
		);
	};
	const cartLink = (item, i) => {
		const user = props.userData.data;
		return (
			<div className="cart_link" key={i}>
				<span>{user.cart ? user.cart.length : 0}</span>
				<Link to={item.linkTo}>{item.name}</Link>
			</div>
		);
	};
	const showLinks = (type) => {
		const list = [];
		if (props.userData) {
			type.forEach((item) => {
				if (!props.userData.isLoggedIn) {
					if (item.public === true) {
						list.push(item);
					}
				} else {
					if (item.name !== 'Log In') {
						list.push(item);
					}
				}
			});
		}
		return list.map((item, i) => {
			if (item.name !== 'My cart') {
				return defaultLink(item, i);
			} else {
				return cartLink(item, i);
			}
		});
	};
	return (
		<header className="bck_b_light">
			<div className="container">
				<div className="left">
					<div className="logo">Waves</div>
				</div>
				<div className="right">
					<div className="top">{showLinks(user)}</div>
					<div className="buttom">{showLinks(page)}</div>
				</div>
			</div>
		</header>
	);
};
const mapStateToProps = ({ userState }) => {
	return {
		userData: userState.userData,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser: () => dispatch(logoutUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
