import React, { useEffect, useState } from 'react';
import PageTop from '../../utils/PageTop';
import CollapseCheckBox from '../../utils/CollapseCheckBox';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import {
	getBrandsApi,
	getWoodsApi,
	getProductsToShopApi,
} from '../../apiActions/productApi';
import {
	getBrands,
	getWoods,
	getProductsToShop,
} from '../../store/actions/productsActions';
import { frets, price } from '../../utils/form/fixedCategory';
import CollapseRadio from '../../utils/CollapseRadio';
import LoadMoreCard from './LoadMoreCard';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';
const Shop = (props) => {
	const [woods, setWoods] = useState([]);
	const [brands, setBrands] = useState([]);
	const [shopProducts, setShopProducts] = useState([]);
	const [shopProductsSize, setShopProductsSize] = useState(0);
	const [info, setInfo] = useState({
		grid: '',
		limit: 6,
		skip: 0,
		filters: {
			brand: [],
			frets: [],
			wood: [],
			price: [],
		},
	});
	useEffect(() => {
		const fetch = async () => {
			const data = await getBrandsApi();
			if (data.success) {
				props.getBrands(data.result);
				setBrands(data.result);
			} else {
				console.log(data.errorMessage);
			}
			const response = await getWoodsApi();
			if (response.success) {
				props.getWoods(response.result);
				setWoods(response.result);
			} else {
				console.log(response.errorMessage);
			}
			console.log({
				skip: info.skip,
				limit: info.limit,
				filters: info.filters,
			});
			const shop = await getProductsToShopApi(
				info.skip,
				info.limit,
				info.filters
			);
			console.log(shop);
			if (shop.success) {
				props.getProductsToShop({ result: shop.result, size: shop.size });
				setShopProducts(shop.result);
				setShopProductsSize(shop.size);
			} else {
				console.log(shop.errorMessage);
			}
		};
		fetch();
	}, [info]);
	const handleGrid = () => {
		setInfo({ ...info, grid: !info.grid ? 'grid_bars' : '' });
	};
	const loadMore = async () => {
		let skip = info.skip + info.limit;
		const data = await getProductsToShopApi(skip, info.limit, info.filters);
		console.log(data);
		if (data.success) {
			props.getProductsToShop({
				result: [...shopProducts, ...data.result],
				size: shopProductsSize + data.size,
			});
			setShopProducts([...shopProducts, ...data.result]);
			setShopProductsSize((prevShop) => prevShop + data.size);
		} else {
			console.log(data.errorMessage);
		}
	};
	const handlePrice = (filters) => {
		const newPrice = price;
		let array = [];
		for (let key in newPrice) {
			if (newPrice[key]._id === parseInt(filters, 10)) {
				array = newPrice[key].array;
			}
		}
		return array;
	};
	const handleFilters = (filters, category) => {
		const newFilters = { ...info.filters };
		newFilters[category] = filters;
		if (category === 'price') {
			let priceValues = handlePrice(filters);
			newFilters[category] = priceValues;
		}
		setInfo({ ...info, filters: { ...newFilters } });
	};

	return (
		<div>
			<PageTop title="Browse Product" />
			<div className="container">
				<div className="shop_wrapper">
					<div className="left">
						<CollapseCheckBox
							handleFilters={(filters) => handleFilters(filters, 'brand')}
							initState={true}
							title="Brands"
							list={brands}
						/>
						<CollapseCheckBox
							handleFilters={(filters) => handleFilters(filters, 'Frets')}
							initState={false}
							title="Frets"
							list={frets}
						/>
						<CollapseCheckBox
							handleFilters={(filters) => handleFilters(filters, 'wood')}
							initState={false}
							title="woods"
							list={woods}
						/>
						<CollapseRadio
							handleFilters={(filters) => handleFilters(filters, 'price')}
							initState={false}
							title="price"
							list={price}
						/>
					</div>
					<div className="right">
						<div className="shop_options">
							<div className="shop_grids clear">
								<div
									style={{ cursor: 'pointer' }}
									onClick={handleGrid}
									className={`grid_btn ${info.grid ? '' : 'active'}`}
								>
									<FontAwesomeIcon icon={faTh} />
								</div>
								<div
									style={{ cursor: 'pointer' }}
									onClick={handleGrid}
									className={`grid_btn ${info.grid ? 'active' : ''}`}
								>
									<FontAwesomeIcon icon={faBars} />
								</div>
							</div>
						</div>
						<div>
							<LoadMoreCard
								grid={info.grid}
								limit={info.limit}
								size={shopProductsSize}
								list={shopProducts}
								loadMore={loadMore}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getBrands: (data) => dispatch(getBrands(data)),
		getWoods: (data) => dispatch(getWoods(data)),
		getProductsToShop: (data) => dispatch(getProductsToShop(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Shop);
