import React, { useEffect, useState } from 'react';
import UserLayout from '../../hoc/UserLayout';
import Button from '../../utils/Button';
import { connect } from 'react-redux';
import { currentUserApi } from '../../apiActions/authApi';
import { currentUserData } from '../../store/actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';
const UserDashboard = ({ user, currentUserData }) => {
	const [loading, setLoading] = useState(false);
	const [requestState, setRequestState] = useState({
		error: false,
		errorMessage: '',
		success: false,
	});
	const { data } = user;
	console.log(data);
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			const response = await currentUserApi();
			if (response.success) {
				setLoading(false);
				currentUserData(response.result);
				setRequestState({ ...requestState, success: true });
			} else {
				setLoading(false);
				setRequestState({
					...requestState,
					error: true,
					errorMessage: response.errorMessage,
				});
			}
		};
		fetch();
	}, []);
	return (
		<UserLayout>
			<div>
				<div className="user_nfo_panel">
					<h1>User Information</h1>
					{loading && <CircularProgress style={{ color: '#007bff' }} />}
					{!loading && requestState.success && (
						<div>
							<span>name :{data.name}</span>
							<span>lasName :{data.lastName}</span>
							<span>email :{data.email}</span>
						</div>
					)}
					<Button
						type="default"
						title="Edit account info"
						linkTo="/user/user_profile"
					/>
				</div>
				<div className="user_nfo_panel">
					<h1>history purchases</h1>
					<div className="user_product_block_wrapper">history</div>
				</div>
			</div>
		</UserLayout>
	);
};
const mapStateToProps = ({ userState }) => {
	return {
		user: userState.userData,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		currentUserData: (data) => dispatch(currentUserData(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
