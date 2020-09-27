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

import { getBrands } from '../../store/actions/productsActions';

import { getBrandsApi, addBrandsApi } from '../../apiActions/productApi';
const MangeBrands = (props) => {
	const [inputsAreValid, setInputsAreValid] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errorFetching, setErrorFetching] = useState(false);
	const [formSubmitResult, setFormSubmitResult] = useState({
		submitError: false,
		submitSuccess: false,
		submitErrorMessage: '',
		submitFinsh: false,
	});
	const [brands, setBrands] = useState([]);
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
			const response = await getBrandsApi();
			if (response.success) {
				setLoading(false);
				setBrands(response.result);
				props.getBrands(response.result);
				setErrorFetching(false);
			} else {
				setLoading(false);
				console.log(response.errorMessage);
				setErrorFetching(true);
			}
		};
		fetch();
	}, [formSubmitResult.submitFinsh]);
	const resetFieldHandler = () => {
		const newInputsState = resetInputs(inputsState);
		setInputsState(newInputsState, 'product');
		// setTimeout(() => {
		// 	setFormState({ ...formState, formSuccess: false });
		// }, 3000);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		let dataToSubmit = generateData(inputsState, 'brand');
		console.log(dataToSubmit);
		let formIsValid = isFormValid(inputsState, 'brand');
		if (formIsValid) {
			setLoading(true);
			setInputsAreValid(true);
			const response = await addBrandsApi(dataToSubmit);
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
			props.brands &&
			props.brands.map((item) => (
				<div className="category_item" key={item._id}>
					{item.name}
				</div>
			))
		);
	};
	const updateForm = (element) => {
		const newFormData = update(element, inputsState, 'brand');
		setInputsState(newFormData);
	};

	return (
		<div className="admin_category_wrapper">
			<h1>Brands</h1>
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
						<button type="submit">Add Brand</button>
					</form>
				</div>
			</div>
		</div>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		getBrands: (data) => dispatch(getBrands(data)),
	};
};
const mapStateToProps = ({ productsState }) => {
	return {
		brands: productsState.brands,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MangeBrands);
