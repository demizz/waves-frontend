import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CardProduct from './CardProduct';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
	getProductsBySell,
	getProductsByArrival,
} from '../../store/actions/productsActions';
import {
	getProductsBySellApi,
	getProductsByArrivalApi,
} from '../../apiActions/productApi';
const Home = (props) => {
	const [productByArrival, setProductByArrival] = useState([]);
	const [loadingArrival, setLoadingArrival] = useState(false);
	const [loadingSell, setLoadingSell] = useState(false);
	const [requestResult, setRequestResult] = useState({
		error: false,
		errorMessage: '',
		success: false,
	});
	const [productBySell, setProductBySell] = useState([]);
	useEffect(() => {
		const fetchByArrival = async () => {
			setLoadingArrival(true);
			const data = await getProductsByArrivalApi();
			if (data.success) {
				setLoadingArrival(false);
				props.getProductsByArrival(data.result);
				setProductByArrival(data.result);
				setRequestResult({ ...requestResult, success: true });
			} else {
				setLoadingArrival(false);

				setRequestResult({
					...requestResult,
					error: true,
					errorMessage: data.errorMessage,
				});
			}
		};
		const fetchBySell = async () => {
			setLoadingSell(true);
			const data = await getProductsBySellApi();
			if (data.success) {
				props.getProductsBySell(data.result);
				setProductBySell(data.result);
				setLoadingSell(false);
				setRequestResult({ ...requestResult, success: true });
			} else {
				setLoadingSell(false);
				setRequestResult({
					...requestResult,
					error: true,
					errorMessage: data.errorMessage,
				});
			}
		};
		fetchByArrival();
		fetchBySell();
	}, []);
	return (
		<div>
			<HomeSlider />
			{loadingSell && (
				<CircularProgress style={{ color: '#007bff' }} thickness={2} />
			)}
			{!loadingSell && !requestResult.error && (
				<CardProduct list={productBySell} title="Best Selling guitars" />
			)}
			<HomePromotion />
			{loadingArrival && (
				<CircularProgress style={{ color: '#007bff' }} thickness={2} />
			)}
			{!loadingArrival && !requestResult.error && (
				<CardProduct list={productByArrival} title="Best Arrival guitars" />
			)}
		</div>
	);
};
function mapStateToProps({ productsState }) {
	return {
		productsByArrival: productsState.productsDataByArrival,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getProductsByArrival: (data) => dispatch(getProductsByArrival(data)),
		getProductsBySell: (data) => dispatch(getProductsBySell(data)),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
