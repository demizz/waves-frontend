import {
	GET_PRODUCTS_BY_SELL,
	GET_PRODUCTS_BY_ARRIVAL,
	GET_WOODS,
	GET_BRANDS,
	GET_PRODUCTS_TO_SHOP,
	GET_PRODUCTS_BY_ID,
	ADD_TO_CARD,
	GET_CART_ITEM,
	REMOVE_FROM_CART,
} from '../types.js';

export const getProductsByArrival = (data) => {
	return {
		type: GET_PRODUCTS_BY_ARRIVAL,
		payload: {
			data,
		},
	};
};
export const getProductsBySell = (data) => {
	return {
		type: GET_PRODUCTS_BY_SELL,
		payload: {
			data,
		},
	};
};
export const getBrands = (data) => {
	return {
		type: GET_BRANDS,
		payload: {
			data,
		},
	};
};
export const getWoods = (data) => {
	return {
		type: GET_WOODS,
		payload: {
			data,
		},
	};
};
export const getProductsToShop = (data) => {
	return {
		type: GET_PRODUCTS_TO_SHOP,
		payload: {
			data,
		},
	};
};
export const getProductById = (data) => {
	return {
		type: GET_PRODUCTS_BY_ID,
		payload: {
			data,
		},
	};
};
export const addToCart = (data) => {
	return {
		type: ADD_TO_CARD,
		payload: {
			data,
		},
	};
};
export const getCartItem = (data) => {
	return {
		type: GET_CART_ITEM,
		payload: {
			data,
		},
	};
};
export const removeFromCart = (data) => {
	return {
		type: REMOVE_FROM_CART,
		payload: {
			data,
		},
	};
};
