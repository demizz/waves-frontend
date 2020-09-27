import React from 'react';
import Layout from './hoc/Layout';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import Home from './components/home/Home';
import RegisterLogin from './components/RegisterLogin/RegisterLogin';
import Register from './components/RegisterLogin/Register';
import UserDashboard from './components/userDashboard/UserDashboard';
import AddProducts from './components/Admin/AddProducts';
import ManageCategory from './components/Admin/ManageCategory';
import Product from './components/product/Product';
import Authcheck from './hoc/Authcheck';
import Cart from './components/Admin/Cart';
import Shop from './components/shop/Shop';
const Routes = () => {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/ProductDetail/:id" component={Product} />

					<Route exact path="/shop" component={Shop} />
					<Route exact path="/login" component={RegisterLogin} />

					<Route exact path="/register" component={Register} />
					<Route
						exact
						path="/admin/add_product"
						component={Authcheck(AddProducts)}
					/>
					<Route
						exact
						path="/admin/manage_categories"
						component={Authcheck(ManageCategory)}
					/>

					<Route
						exact
						path="/user/dashboard"
						component={Authcheck(UserDashboard)}
					/>
					<Route exact path="/user/cart" component={Authcheck(Cart)} />

					<Redirect to="/" />
				</Switch>
			</Layout>
		</Router>
	);
};

export default Routes;
