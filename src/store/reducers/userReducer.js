import {
	USER_LOGIN,
	USER_REGISTER,
	CURRENT_USER_DATA,
	LOGOUT_USER,
	ADD_TO_CARD,
} from '../types.js';

const initialState = { userData: {} };
export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case USER_LOGIN:
			return { ...state, userData: action.payload.data };
		case USER_REGISTER:
			return { ...state, userData: action.payload.data };
		case CURRENT_USER_DATA:
			return { ...state, userData: action.payload.data };
		case LOGOUT_USER:
			return { ...state, userDate: {} };
		case ADD_TO_CARD:
			return {
				...state,
				userData: {
					...state.userData,
					data: { ...state.userData.data, cart: action.payload },
				},
			};
		default:
			return state;
	}
}
