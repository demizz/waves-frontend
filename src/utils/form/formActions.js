export const validate = (element, formdata = []) => {
	let error = [true, ''];
	if (element.validation.email) {
		const valid = /\S+@\S+\.\S+/.test(element.value);
		const message = `${!valid ? 'This field must be an email' : ''}`;
		error = !valid ? [valid, message] : [true, ''];
	}
	if (element.validation.confirm) {
		const valid =
			element.value.trim() ===
			formdata[element.validation.confirm].value.trim();

		const message = `${!valid ? 'This password dont mutch' : ''}`;
		error = !valid ? [valid, message] : [true, ''];
	}
	if (element.validation.required) {
		const valid = element.value.trim() !== '';
		const message = `${!valid ? 'This field is requied' : ''}`;
		error = !valid ? [valid, message] : [true, ''];
	}
	return error;
};
export const populteOptionFields = (formdata, arrayData = [], field) => {
	const newArray = [];

	const newFormData = { ...formdata };
	arrayData.forEach((item) => {
		newArray.push({ key: item._id, value: item.name });
	});

	newFormData[field].config.options = newArray;

	return newFormData;
};
export const resetInputs = (inputs, formName) => {
	const newInputs = { ...inputs };
	for (let key in newInputs) {
		newInputs[key].value = '';
		newInputs[key].valid = false;
		newInputs[key].touched = false;
		newInputs[key].validationMessage = '';
	}
	return newInputs;
};
export const update = (element, formData, formName) => {
	const newFormData = { ...formData };
	const newElement = { ...newFormData[element.id] };

	newElement.value = element.event.target.value;

	if (element.blur) {
		let validData = validate(newElement, formData);
		newElement.valid = validData[0];
		newElement.validationMessage = validData[1];
	}
	newElement.touched = element.blur;
	newFormData[element.id] = newElement;
	return newFormData;
};
export const generateData = (formData, formName) => {
	let data = {};
	for (let key in formData) {
		data[key] = formData[key].value;
	}
	return data;
};
export const isFormValid = (formData, formName) => {
	let valid = true;
	for (let key in formData) {
		valid = valid && formData[key].valid;
	}
	return valid;
};
