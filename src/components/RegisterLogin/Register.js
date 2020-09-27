import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import {
	update,
	generateData,
	isFormValid,
} from '../../utils/form/formActions';
import FormField from '../../utils/form/FormField';
import { registerApi } from '../../apiActions/authApi';
import { userRegister } from '../../store/actions/userActions';

const Register = (props) => {
	const history = useHistory();
	const [formState, setFormState] = useState({
		formError: false,
		formErrorMessage: '',
		formsuccess: false,
	});
	const [formData, setFormData] = useState({
		name: {
			element: 'input',
			value: '',
			config: {
				name: 'name_input',
				type: 'text',
				placeholder: 'Enter your name',
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
		},
		lastName: {
			element: 'input',
			value: '',
			config: {
				name: 'lasName_input',
				type: 'text',
				placeholder: 'Enter your lastName',
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
		},
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
		confirmPassword: {
			element: 'input',
			value: '',
			config: {
				name: 'confirm_password_input',
				type: 'password',
				placeholder: 'confirm your password',
			},
			validation: {
				confirm: 'password',
			},
			valid: false,
			touched: false,
			validationMessage: '',
		},
	});
	const updateForm = (element) => {
		const newFormData = update(element, formData, 'register');

		setFormData({ ...newFormData });
	};
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		let dataToSubmit = generateData(formData, 'register');
		let formIsValid = isFormValid(formData, 'register');

		if (formIsValid) {
			const data = await registerApi(dataToSubmit);

			if (data.success) {
				props.userRegister(data.result);
				setFormState({
					...formState,
					formError: false,
					formErrorMessage: '',
					formSuccess: true,
				});
				setTimeout(() => {
					history.push('/login');
				}, 3000);
			} else {
				setFormState({
					...formState,
					formError: true,
					formErrorMessage: data.errorMessage,
					formSuccess: false,
				});
			}
		}
	};
	return (
		<div className="page_wrapper">
			<div className="container">
				<div className="register_login_container">
					<div className="left">
						<form onSubmit={onSubmitHandler} action="">
							<h2>Personal information</h2>
							<div className="form_block_two">
								<div className="block">
									<FormField
										id={'name'}
										formdata={formData.name}
										change={updateForm}
									/>
								</div>
								<div className="block">
									<FormField
										id={'lastName'}
										formdata={formData.lastName}
										change={updateForm}
									/>
								</div>
							</div>
							<div>
								<FormField
									id={'email'}
									formdata={formData.email}
									change={updateForm}
								/>
							</div>
							<h2>Verify password</h2>
							<div className="form_block_two">
								<div className="block">
									<FormField
										id={'password'}
										formdata={formData.password}
										change={updateForm}
									/>
								</div>
								<div className="block">
									<FormField
										id={'confirmPassword'}
										formdata={formData.confirmPassword}
										change={updateForm}
									/>
								</div>
							</div>
							{formData.formError ? (
								<div className="error_label">Please check your data</div>
							) : null}
							<button type="submit">create an account</button>
						</form>
					</div>
				</div>
			</div>
			<Dialog open={formState.formSuccess}>
				<div className="dialog_alert">
					<div>Congratulations</div>
					<div>You will be redirect to the LOGIN</div>
				</div>
			</Dialog>
			<Dialog open={formState.formError}>
				<div className="dialog_alert">
					<div>{formState.formErrorMessage}</div>
				</div>
			</Dialog>
		</div>
	);
};
const mapStateToProps = ({ userState }) => {
	return { userData: userState.userData };
};
function mapDispatchToProps(dispatch) {
	return {
		userRegister: (data) => dispatch(userRegister(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
