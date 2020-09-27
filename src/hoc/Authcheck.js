import React from 'react';
import { Redirect } from 'react-router-dom';

export default function (ComposedClass) {
	const Authcheck = () => {
		const jwt = localStorage.getItem('jwt');

		const userData = localStorage.getItem('userData');

		return (
			<div>
				{!jwt && <Redirect to="/" />}
				{jwt && <ComposedClass userData={userData} />}
			</div>
		);
	};

	return Authcheck;
}
