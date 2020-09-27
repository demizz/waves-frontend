import axios from 'axios';
import { authURL } from '../utils/api';
export const currentUserApi = async () => {
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
			url: `${authURL}/currentUser`,
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
export const loginApi = async (dataToSubmit) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };

		const res = await axios({
			url: `${authURL}/login`,
			method: 'POST',
			data: dataToSubmit,
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
export const registerApi = async (dataToSubmit) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };

		const res = await axios({
			url: `${authURL}/signup`,
			method: 'POST',
			data: dataToSubmit,
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
export const logoutUserApi = async (dataToSubmit) => {
	let data = {
		error: false,
		errorMessage: '',
		loading: false,
		result: {},
		success: false,
	};

	try {
		data = { ...data, loading: true };

		const res = await axios({
			url: `${authURL}/logout`,
			method: 'GET',
			headers: {
				authentication: 'Bearer ' + localStorage.getItem('jwt'),
			},
		});
		if (res.data.status === 'success') {
			data = {
				...data,
				error: false,
				errorMessage: '',
				loading: false,
				result: {},
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
