import React, { useState } from 'react';
import Button from './Button';
import { connect } from 'react-redux';
import { addToCartApi } from '../apiActions/productApi';
import { addToCart } from '../store/actions/productsActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const Card = (props) => {
	const [loading, setLoading] = useState(false);
	const [requestResult, setRequestResult] = useState({
		requestError: false,
		requestErrorMessage: '',
		requestSuccess: false,
	});
	const renderCardImage = (images) => {
		if (images.length > 0) {
			return images[0].url;
		} else {
			return `/images/image_not_availble.png`;
		}
	};
	const addInCart = async () => {
		if (props.user.isLoggedIn) {
			setLoading(true);
			const response = await addToCartApi(props._id);
			if (response.success) {
				setLoading(false);
				setRequestResult({ ...requestResult, requestSuccess: true });
				props.addToCart(response.result);
				console.log(response);
			} else {
				console.log(response.errorMessage);
				setLoading(false);
				setRequestResult({
					...requestResult,
					requestSuccess: false,
					requestError: true,
					requestErrorMessage: response.errorMessage,
				});
			}
		} else {
			console.log('you are not logged in');
		}
	};
	return (
		<div className={`card_item_wrapper ${props.grid}`}>
			{loading && <CircularProgress style={{ color: '#007bff' }} />}
			<div
				className="image"
				style={{
					background: `url(${renderCardImage(props.images)}) `,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			></div>
			<div className="action_container">
				<div className="tags">
					<div className="brand">{props.brand.name}</div>
					<div className="name">{props.name}</div>
					<div className="name"> ${props.price}</div>
				</div>
			</div>
			{props.grid ? (
				<div className="descritpion">{props.description}</div>
			) : null}
			<div className="actions">
				<div className="button_wrapp">
					<Button
						type="default"
						altClass="card_link"
						title="view product"
						linkTo={`/ProductDetail/${props._id}`}
						addStyle={{ margin: '10 px 0 0 0' }}
					/>
				</div>
				<div className="button_wrapp">
					<Button type="bag_link" runAction={addInCart} />
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = ({ userState, productState }) => {
	return {
		user: userState.userData,
		product: productState,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (data) => dispatch(addToCart(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
