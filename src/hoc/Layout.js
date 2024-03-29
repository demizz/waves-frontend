import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
const Layout = (props) => {
	return (
		<div>
			<Header />
			<div className="page_container">{props.children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
