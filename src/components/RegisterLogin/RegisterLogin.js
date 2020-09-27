import React from 'react';
import Button from '../../utils/Button';
import Login from './Login';
const RegisterLogin = () => {
	return (
		<div className="page_wrapper">
			<div className="container">
				<div className="register_login_container">
					<div className="left">
						<h1>New Customers</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
							itaque dignissimos nesciunt minima explicabo non modi.
						</p>
						<Button
							type="default"
							title="create an account"
							linkTo="/register"
							assStyles={{
								margin: '10px 0 0 0',
							}}
						/>
					</div>
					<div className="right">
						<h2>Registred customers</h2>
						<p>if you are already register</p>
						<Login />
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterLogin;
