import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import MangeBrands from './MangeBrands';
import MangeWoods from './MangeWoods';
const ManageCategory = () => {
	return (
		<UserLayout>
			<MangeBrands />
			<MangeWoods />
		</UserLayout>
	);
};

export default ManageCategory;
