import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTop from '../../utils/PageTop';
import { getProductByIdApi } from '../../apiActions/productApi';
import { getProductById } from '../../store/actions/productsActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProdImage from './ProdImage';
import ProductInfo from './ProductInfo';
import { connect } from 'react-redux';
const Product = (props) => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState([]);
	const [requestResult, setRequestResult] = useState({
		requestSuccess: false,
		requestError: false,
		requestErrorMessage: '',
	});
	console.log({ id });
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			const response = await getProductByIdApi(id);
			if (response.success) {
				console.log(response);
				setLoading(false);
				console.log(response.result);
				props.getProductById(response.result);
				setProduct(response.result);
				setRequestResult({ ...requestResult, requestSuccess: true });
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
		fetch();
	}, []);
	const showLoading = () => {
		if (loading) {
			return <CircularProgress style={{ color: '#007bff' }} />;
		}
	};
	const addToCartHandler = (id) => {};
	return (
		<div>
			<PageTop title="Product Detail" />
			{showLoading()}
			{!loading && requestResult.requestSuccess && (
				<div className="container">
					{props.products.oneProduct && (
						<div className="product_detail_wrapper">
							<div className="left">
								<div style={{ width: '500px' }}>
									<ProdImage detail={props.products.oneProduct[0]} />
								</div>
							</div>
							<div className="right">
								<ProductInfo
									addToCart={addToCartHandler}
									detail={props.products.oneProduct[0]}
								/>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = ({ productsState }) => {
	return {
		products: productsState,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getProductById: (data) => dispatch(getProductById(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
