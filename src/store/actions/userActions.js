import {
	USER_LOGIN,
	USER_REGISTER,
	CURRENT_USER_DATA,
	LOGOUT_USER,
} from '../types';
export const userLogin = (data) => {
	return {
		type: USER_LOGIN,
		payload: {
			data,
		},
	};
};
export const userRegister = (data) => {
	return {
		type: USER_REGISTER,
		payload: {
			data,
		},
	};
};
export const currentUserData = (data) => {
	return {
		type: CURRENT_USER_DATA,
		payload: {
			data,
		},
	};
};
export const logoutUser = () => {
	return {
		type: LOGOUT_USER,
	};
};
