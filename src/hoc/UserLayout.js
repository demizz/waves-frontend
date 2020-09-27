import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const links = [
	{
		name: 'My account',
		linkTo: '/user/dashboard',
	},
	{
		name: 'User information',
		linkTo: '/user/user_profile',
	},
	{
		name: 'My cart',
		linkTo: '/user/cart',
	},
];
const admin = [
	{
		name: 'Site Info',
		linkTo: '/admin/site_info',
	},
	{
		name: 'Add products',
		linkTo: '/admin/add_product',
	},
	{ name: 'Manage categories', linkTo: '/admin/manage_categories' },
];
const UserLayout = (props) => {
	const role = localStorage.getItem('role');
	const generateLinks = (links) => {
		return links.map((item, i) => (
			<li>
				<Link key={i} to={item.linkTo}>
					{item.name}
				</Link>
			</li>
		));
	};

	return (
		<div className="container">
			<div className="user_container">
				<div className="user_left_nav">
					<h2>My account</h2>
					<div className="links">{generateLinks(links)}</div>
					{role === 'admin' && (
						<div>
							<h2>Admin</h2>
							<div className="links">{generateLinks(admin)}</div>
						</div>
					)}
				</div>
				<div className="user_right">{props.children}</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ userState }) => {
	return {
		userData: userState.userData.data,
	};
};
export default connect(mapStateToProps)(UserLayout);
