import React, { useState, useEffect, useCallback } from 'react';
import UserLayout from '../../hoc/UserLayout';
import CircularProgress from '@material-ui/core/CircularProgress';
import FileUpload from '../../utils/FileUpload';
import {
	update,
	generateData,
	isFormValid,
	populteOptionFields,
	resetInputs,
} from '../../utils/form/formActions';
import FormField from '../../utils/form/FormField';
import { connect } from 'react-redux';
import {
	getBrandsApi,
	getWoodsApi,
	addProductApi,
} from '../../apiActions/productApi';
import { getBrands, getWoods } from '../../store/actions/productsActions';
const AddProducts = (props) => {
	const [brands, setBrands] = useState([]);
	const [wood, setWood] = useState([]);
	const [loading, setLoading] = useState(false);
	const [formState, setFormState] = useState({
		formError: false,
		formSuccess: false,
		formErrorMessage: '',
		formIsValidInputs: false,
	});
	const [inputsState, setInputsState] = useState({
		name: {
			element: 'input',
			value: '',
			config: {
				label: 'Product name',
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
			showLabel: true,
		},
		description: {
			element: 'input',
			value: '',
			config: {
				label: 'Product description',
				description: 'description_input',
				type: 'text',
				placeholder: 'Enter your description',
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
		price: {
			element: 'input',
			value: '',
			config: {
				label: 'Product price',
				price: 'name_input',
				type: 'number',
				placeholder: 'Enter your price',
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
		brand: {
			element: 'select',
			value: '',
			config: {
				label: 'Product brand',
				brand: 'brand_input',

				options: [],
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
		shipping: {
			element: 'select',
			value: '',
			config: {
				label: 'Product shipping',
				brand: 'shipping',

				options: [
					{
						key: true,
						value: 'Yes',
					},
					{
						key: false,
						value: 'No',
					},
				],
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
		available: {
			element: 'select',
			value: '',
			config: {
				label: 'Product available',
				available: 'available_input',

				options: [
					{
						key: true,
						value: 'Yes',
					},
					{
						key: false,
						value: 'No',
					},
				],
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
		wood: {
			element: 'select',
			value: '',
			config: {
				label: ' wood material',
				wood: 'wood_input',

				options: [],
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
		frets: {
			element: 'select',
			value: '',
			config: {
				label: 'Product frets',
				frets: 'frets_input',

				options: [
					{
						key: 20,
						value: 20,
					},
					{
						key: 21,
						value: 21,
					},
					{
						key: 22,
						value: 22,
					},
					{
						key: 23,
						value: 23,
					},
				],
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
		publish: {
			element: 'select',
			value: '',
			config: {
				label: ' publish material',
				publish: 'publish_input',

				options: [
					{ key: true, value: 'public ' },
					{
						key: false,
						value: 'hidden',
					},
				],
			},
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			validationMessage: '',
			showLabel: true,
		},
		images: {
			value: [],
			validation: {
				required: false,
			},
			valid: true,
			touched: false,
			validationMessage: '',
			showLabel: false,
		},
	});

	useEffect(() => {
		const fetch = async () => {
			const dataBrand = await getBrandsApi();
			console.log({ brands, wood });
			if (dataBrand.success) {
				console.log([...dataBrand.result]);
				setBrands([...dataBrand.result]);
				props.getBrands([...dataBrand.result]);
			} else {
				console.log(dataBrand.errorMessage);
			}
			const dataWood = await getWoodsApi();
			if (dataWood.success) {
				setWood([...dataWood.result]);
				props.getWoods([...dataWood.result]);
			} else {
				console.log(dataWood.errorMessage);
			}
		};
		fetch();
	}, []);
	const updateFields = useCallback(() => {
		const newFormDatabrands = populteOptionFields(inputsState, brands, 'brand');
		const newFormDatawoods = populteOptionFields(inputsState, wood, 'wood');

		setInputsState({ ...newFormDatabrands });
		setInputsState({ ...newFormDatawoods });
	}, [brands, wood]);

	const updateForm = (element) => {
		updateFields();
		const newFormData = update(element, inputsState, 'product');
		setInputsState(newFormData);
	};
	const resetFieldHandler = () => {
		const newInputsState = resetInputs(inputsState);
		setInputsState(newInputsState, 'product');
		// setTimeout(() => {
		// 	setFormState({ ...formState, formSuccess: false });
		// }, 3000);
	};
	const showLoading = () => {
		if (loading) {
			return (
				<div className="main_loader">
					<CircularProgress style={{ color: '#2196F3' }} thickness={7} />
				</div>
			);
		}
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		let dataToSubmit = generateData(inputsState, 'product');
		console.log(dataToSubmit);
		let formIsValid = isFormValid(inputsState, 'product');
		if (formIsValid) {
			const response = await addProductApi(dataToSubmit);
			if (response.success) {
				console.log(response.result);
				setFormState({ ...formState, formSuccess: true, formError: false });
				resetFieldHandler();
			} else {
				console.log(response.errorMessage);
				setFormState({ ...formState, formErrorMessage: response.errorMessage });
			}
		} else {
			setFormState({
				...formState,
				formIsValidInputs: false,

				formError: true,
			});
		}
	};
	const imagesHandler = (images) => {
		const newInputsState = { ...inputsState };
		newInputsState['images'].value = images;
		newInputsState['images'].valid = true;
		setInputsState({ ...newInputsState });
	};
	return (
		<UserLayout>
			<div>
				<h1>Add product</h1>
				<form action="" onSubmit={submitHandler}>
					<FileUpload
						imagesHandler={imagesHandler}
						reset={formState.formSuccess}
					/>

					<FormField
						id={'name'}
						formdata={inputsState.name}
						change={updateForm}
					/>
					<FormField
						id={'description'}
						formdata={inputsState.description}
						change={updateForm}
					/>
					<FormField
						id={'price'}
						formdata={inputsState.price}
						change={updateForm}
					/>
					<div className="form_devider">
						<FormField
							id={'brand'}
							formdata={inputsState.brand}
							change={updateForm}
						/>
						<FormField
							id={'shipping'}
							formdata={inputsState.shipping}
							change={updateForm}
						/>
						<FormField
							id={'available'}
							formdata={inputsState.available}
							change={updateForm}
						/>
						<FormField
							id={'wood'}
							formdata={inputsState.wood}
							change={updateForm}
						/>
						<FormField
							id={'frets'}
							formdata={inputsState.frets}
							change={updateForm}
						/>
						<FormField
							id={'publish'}
							formdata={inputsState.publish}
							change={updateForm}
						/>
					</div>
					{formState.formSuccess && <div className="form_success">Success</div>}
					{formState.formError ? (
						<div className="error_label">Please check your data</div>
					) : null}
					<button type="submit">Add Product</button>
				</form>
			</div>
		</UserLayout>
	);
};

const mapStateToProps = ({ productsState }) => {
	return {
		products: productsState,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getBrands: (data) => dispatch(getBrands(data)),
		getWoods: (data) => dispatch(getWoods(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
