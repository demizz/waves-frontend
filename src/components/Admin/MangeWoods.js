import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormField from '../../utils/form/FormField';
import {
	update,
	generateData,
	isFormValid,
	resetInputs,
} from '../../utils/form/formActions';
import { connect } from 'react-redux';

import { getWoods } from '../../store/actions/productsActions';

import { getWoodsApi, addWoodsApi } from '../../apiActions/productApi';
const MangeWoods = (props) => {
	const [inputsAreValid, setInputsAreValid] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errorFetching, setErrorFetching] = useState(false);
	const [formSubmitResult, setFormSubmitResult] = useState({
		submitError: false,
		submitSuccess: false,
		submitErrorMessage: '',
		submitFinsh: false,
	});
	const [woods, setWoods] = useState([]);
	const [inputsState, setInputsState] = useState({
		name: {
			element: 'input',
			value: '',
			config: {
				label: 'Brand name',
				name: 'name_input',
				type: 'text',
				placeholder: 'Enter Brand name',
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
	});
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			const response = await getWoodsApi();
			if (response.success) {
				setLoading(false);
				setWoods(response.result);
				props.getWoods(response.result);
				setErrorFetching(false);
			} else {
				setLoading(false);
				console.log(response.errorMessage);
				setErrorFetching(true);
			}
		};
		fetch();
	}, [formSubmitResult.submitFinsh]);
	const submitHandler = async (e) => {
		e.preventDefault();
		let dataToSubmit = generateData(inputsState, 'woods');
		console.log(dataToSubmit);
		let formIsValid = isFormValid(inputsState, 'woods');
		if (formIsValid) {
			setLoading(true);
			setInputsAreValid(true);
			const response = await addWoodsApi(dataToSubmit);
			if (response.success) {
				setFormSubmitResult({ ...formSubmitResult, submitSuccess: true });
				setTimeout(() => {
					setFormSubmitResult({
						...formSubmitResult,
						submitSuccess: false,
						submitFinsh: true,
					});
				}, 4000);
				resetFieldHandler();
			} else {
				setFormSubmitResult({
					...formSubmitResult,
					submitError: false,
					submitErrorMessage: response.errorMessage,
                });
                                resetFieldHandler();

			}
		} else {
			setInputsAreValid(false);
		}
	};
	const showCategoryItems = () => {
		return (
			props.woods &&
			props.woods.map((item) => (
				<div className="category_item" key={item._id}>
					{item.name}
				</div>
			))
		);
	};
	const updateForm = (element) => {
		const newFormData = update(element, inputsState, 'woods');
		setInputsState(newFormData);
	};
	const resetFieldHandler = () => {
		const newInputsState = resetInputs(inputsState);
		setInputsState(newInputsState, 'product');
		// setTimeout(() => {
		// 	setFormState({ ...formState, formSuccess: false });
		// }, 3000);
	};
	return (
		<div className="admin_category_wrapper">
			<h1>Woods</h1>
			<div className="admin_two_column">
				<div className="left">
					<div className="brands_container">
						{loading && <CircularProgress style={{ color: '#007bff' }} />}

						{!loading && !errorFetching && showCategoryItems()}
					</div>
				</div>
				<div className="right">
					<form action="" onSubmit={submitHandler}>
						<FormField
							id={'name'}
							formdata={inputsState.name}
							change={updateForm}
						/>
						{formSubmitResult.submitSuccess && (
							<div className="form_success">Success</div>
						)}
						{formSubmitResult.submitError ? (
							<div className="error_label">
								{formSubmitResult.errorSubmitMessage}
							</div>
						) : null}
						{!inputsAreValid ? (
							<div className="error_label">please check your data</div>
						) : null}
						<button type="submit">Add Woods</button>
					</form>
				</div>
			</div>
		</div>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		getWoods: (data) => dispatch(getWoods(data)),
	};
};
const mapStateToProps = ({ productsState }) => {
	return {
		woods: productsState.woods,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MangeWoods);
