import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import {
	update,
	generateData,
	isFormValid,
} from '../../utils/form/formActions';
import FormField from '../../utils/form/FormField';
import { userLogin } from '../../store/actions/userActions';

import { loginApi } from '../../apiActions/authApi';

const Login = (props) => {
	const history = useHistory();
	const [allInputsAreValid, setAllInputsAreValid] = useState(true);
	const [requestState, setRequestState] = useState({
		error: false,
		errorMessage: '',
		success: false,
	});
	const [loading, setLoading] = useState(false);

	const [formInputs, setFormInputs] = useState({
		email: {
			element: 'input',
			value: '',
			config: {
				name: 'email_input',
				type: 'email',
				placeholder: 'Enter your email',
			},
			validation: {
				required: true,
				email: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
		},
		password: {
			element: 'input',
			value: '',
			config: {
				name: 'password_input',
				type: 'password',
				placeholder: 'Enter your password',
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
		},
	});
	const updateForm = (element) => {
		const newFormData = update(element, formInputs, 'login');

		setFormInputs(newFormData);
	};
	const submitForm = async (e) => {
		e.preventDefault();
		let dataToSubmit = generateData(formInputs, 'login');
		let formIsValid = isFormValid(formInputs, 'login');
		if (formIsValid) {
			const response = await loginApi(dataToSubmit);
			setLoading(true);
			setAllInputsAreValid(true);
			if (response.success) {
				props.userLogin(response.result);
				setRequestState({
					...requestState,
					success: true,
				});
				setLoading(false);
				localStorage.setItem('jwt', response.result.token);
				localStorage.setItem('userData', JSON.stringify(response.result));
				localStorage.setItem('role', response.result.role);
				setTimeout(() => {
					history.push('/user/dashboard');
				}, 2000);
			} else {
				setRequestState({
					error: true,
					errorMessage: response.errorMessage,
				});
				setLoading(false);
			}
		} else {
			setAllInputsAreValid(false);
		}
	};
	return (
		<div className="signin_wrapper">
			<form action="" onSubmit={submitForm}>
				<FormField
					id={'email'}
					formdata={formInputs.email}
					change={updateForm}
				/>
				<FormField
					id={'password'}
					formdata={formInputs.password}
					change={updateForm}
				/>
				{!allInputsAreValid ? (
					<div className="error_label">Please check your data</div>
				) : null}
				{allInputsAreValid && loading && (
					<CircularProgress style={{ color: '#007bff' }} thickness={1} />
				)}
				{allInputsAreValid && requestState.error && (
					<div>{requestState.errorMessage}</div>
				)}

				<Dialog open={requestState.success}>
					<div className="dialog_alert">
						<div>welcome</div>
					</div>
				</Dialog>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
const mapStateToProps = ({ userState }) => {
	return { userData: userState.userData, isLoggedIn: userState.isLoggedIn };
};
function mapDispatchToProps(dispatch) {
	return {
		userLogin: (data) => dispatch(userLogin(data)),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
