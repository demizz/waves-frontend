import {
	GET_PRODUCTS_BY_SELL,
	GET_PRODUCTS_BY_ARRIVAL,
	GET_WOODS,
	GET_BRANDS,
	GET_PRODUCTS_TO_SHOP,
	GET_PRODUCTS_BY_ID,
	GET_CART_ITEM,
	REMOVE_FROM_CART,
} from '../types.js';

const initialState = {
	productsDataByArrival: {},
	productsDataBySell: {},
	brands: [],
	woods: [],
	shop: {},
	oneProduct: [],
	cartItems: [],
};
export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS_BY_ARRIVAL:
			return { ...state, productsDataByArrival: action.payload.data };
		case GET_PRODUCTS_BY_SELL:
			return { ...state, productsDataBySell: action.payload.data };
		case GET_WOODS:
			return { ...state, woods: action.payload.data };
		case GET_BRANDS:
			return { ...state, brands: action.payload.data };
		case GET_PRODUCTS_TO_SHOP:
			return { ...state, shop: { ...action.payload.data } };
		case GET_PRODUCTS_BY_ID:
			return { ...state, oneProduct: [...action.payload.data] };
		case GET_CART_ITEM:
			return { ...state, cartItems: action.payload.data };
		case REMOVE_FROM_CART:
			return { ...state, cartItems: action.payload.data };
		default:
			return state;
	}
}
