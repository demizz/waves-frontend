import React from 'react';

const FormField = ({ formdata, change, id }) => {
	const onBlurHandler = (event) => {
		change({ event, id, blur: true });
	};
	const onChangeHandler = (event) => {
		change({ event, id, blur: false });
	};
	const showError = () => {
		let errorMessage = null;

		if (formdata.validation && !formdata.valid) {
			errorMessage = (
				<div className="error_label">{formdata.validationMessage}</div>
			);
		}
		return errorMessage;
	};
	const renderFormField = () => {
		if (formdata.element === 'input') {
			return (
				<div className="formBlock">
					{formdata.showLabel && (
						<div className="label_inputs">{formdata.config.label}</div>
					)}
					<input
						{...formdata.config}
						value={formdata.value}
						onBlur={onBlurHandler}
						onChange={onChangeHandler}
					/>
					{showError()}
				</div>
			);
		}
		if (formdata.element === 'textarea') {
			return (
				<div className="formBlock">
					{formdata.showLabel && (
						<div className="label_inputs">{formdata.config.label}</div>
					)}
					<textarea
						{...formdata.config}
						value={formdata.value}
						onBlur={onBlurHandler}
						onChange={onChangeHandler}
					/>
					{showError()}
				</div>
			);
		}
		if (formdata.element === 'select') {
			return (
				<div className="formBlock">
					{formdata.showLabel && (
						<div className="label_inputs">{formdata.config.label}</div>
					)}
					<select
						{...formdata.config}
						value={formdata.value}
						onBlur={onBlurHandler}
						onChange={onChangeHandler}
					>
						<option value="">Select One</option>
						{formdata.config.options.map((item) => {
							return (
								<option key={item.key} value={item.key}>
									{item.value}
								</option>
							);
						})}
					</select>
					{showError()}
				</div>
			);
		}
	};
	return <div>{renderFormField()}</div>;
};

export default FormField;
