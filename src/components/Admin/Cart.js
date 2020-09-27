import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

//import Alert from '@material-ui/lab/Alert';
import UserLayout from '../../hoc/UserLayout';
import { getCartItemApi, removeFromCartApi } from '../../apiActions/productApi';
import {
	getCartItem,
	removeFromCart,
} from '../../store/actions/productsActions';
import ProductBlock from '../../utils/ProductBlock';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import { faLessThanEqual } from '@fortawesome/fontawesome-free-solid';
import { useHistory } from 'react-router-dom';
const Cart = ({ userData, getCartItem, products, removeFromCart }) => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);
	const [showTotal, setShowTotal] = useState(true);
	const [prod, setProd] = useState([]);
	const [showSuccess, setShowSuccess] = useState(false);
	const [requestResult, setRequestResult] = useState({
		requestSuccess: false,
		requestError: true,
		requestErrorMessage: '',
	});
	const showNoItemMessage = () => {
		return (
			<div className="cart_no_items">
				<FontAwesomeIcon icon={faFrown} />
				<div>you have no items</div>
			</div>
		);
	};
	useEffect(() => {
		const fetch = async (item) => {
			setLoading(true);
			const response = await getCartItemApi(item);
			if (response.success) {
				console.log({ response: response.result });
				setRequestResult({ ...requestResult, requestSuccess: true });
				getCartItem(response.result);
				setProd(response.result);
				setLoading(false);
			} else {
				console.log(response.errorMessage);
				setRequestResult({
					...requestResult,
					requestError: true,
					requestErrorMessage: response.errorMessage,
				});
				setLoading(false);
			}
		};
		let cartIds = [];
		if (userData.cart) {
			console.log(userData.cart);
			if (userData.cart.length > 0) {
				userData.cart.forEach((item) => {
					cartIds.push(item.id);
				});
				console.log(cartIds);
				fetch(cartIds);
			}
		}
	}, []);
	const removeCartItem = async (id) => {
		//setLoading(true);
		setRequestResult({ ...requestResult, requestSuccess: false });
		const response = await removeFromCartApi(id);
		if (response.success) {
			console.log(response.result);

			setTimeout(() => {
				history.push('/user/cart');
				// removeFromCart(response.result);
				// setProd(response.result);
				// setRequestResult({ ...requestResult, requestSuccess: true });
				// setLoading(false);
			}, 3000);
		} else {
			setLoading(false);
			console.log(response.errorMessage);
			setRequestResult({
				...requestResult,
				requestError: true,
				requestErrorMessage: response.errorMessage,
			});
		}
	};
	return (
		<UserLayout>
			<div>
				<h1>My cart</h1>
				{loading && requestResult.requestSuccess && (
					<CircularProgress style={{ color: '#007bff' }} />
				)}
				<div className="user_cart">
					{!loading && prod && requestResult.requestSuccess && (
						<ProductBlock
							products={prod}
							type="cart"
							removeItem={removeCartItem}
							userData={userData}
						/>
					)}
					{showTotal ? (
						<div>
							<div className="user_cart_sum">
								<div>Total amount :$ {total}</div>
							</div>
						</div>
					) : (
						showNoItemMessage()
					)}
				</div>
			</div>
		</UserLayout>
	);
};
const mapStateToProps = ({ userState, productsState }) => {
	return {
		userData: userState.userData.data,
		products: productsState.cartItems,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getCartItem: (data) => dispatch(getCartItem(data)),
		removeFromCart: (data) => dispatch(removeFromCart(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
