import axios from 'axios';
import { productURL, brandsURL, woodsURL } from '../utils/api';
export const getProductsByArrivalApi = async () => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/article/search?sortBy=createdAt&order=desc&limit=4`,
			method: 'GET',
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};
export const addProductApi = async (product) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/article/createArticle`,
			method: 'POST',
			data: product,
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};
export const getProductsBySellApi = async () => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/article/search?sortBy=sold&order=desc&limit=4`,
			method: 'GET',
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};
export const addToCartApi = async (id) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/article/${id}/addToCart`,
			method: 'patch',
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};

export const removeFromCartApi = async (id) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/article/${id}/removeFromCart`,
			method: 'patch',
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};
export const getProductByIdApi = async (id) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/article/articles-by-id?id=${id}&type=array`,
			method: 'GET',
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};

export const getCartItemApi = async (items) => {
	console.log(items);
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/article/articles-by-id?id=${items}&type=array`,
			method: 'GET',
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};

export const addBrandsApi = async (info) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/brand/create-brand`,
			method: 'POST',
			data: info,
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};
export const addWoodsApi = async (info) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/woods/createWood`,
			method: 'POST',
			data: info,
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};
export const getBrandsApi = async () => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/brand/allBrands`,
			method: 'GET',
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};
export const getWoodsApi = async () => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };
		const jwt = localStorage.getItem('jwt') || '';
		const res = await axios({
			url: `${productURL}/woods/getAllWoods`,
			method: 'GET',
			headers: {
				authentication: 'Bearer ' + jwt,
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
		};
	}

	return data;
};
export const getProductsToShopApi = async (
	skip,
	limit,
	filters = [],
	previousState = []
) => {
	const search = { limit, skip, filters };
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
		size: 0,
	};

	try {
		console.log({ search });
		data = { ...data, loading: true };
		const res = await axios({
			url: `${productURL}/article/shop`,
			method: 'POST',
			data: search,
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: res.data.result,
				success: true,
				size: res.data.size,
			};
		}
	} catch (err) {
		data = {
			...data,
			error: true,
			errorMessage: err.response.data.message,
			loading: false,
			success: false,
			size: 0,
		};
	}

	return data;
};
