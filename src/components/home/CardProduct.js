import React from 'react';
import Card from '../../utils/Card';
const CardProduct = (props) => {
	const renderCards = () => {
		return props.list
			? props.list.map((item, i) => {
					return <Card key={i} {...item} />;
			  })
			: null;
	};
	return (
		<div className="card_block">
			<div className="container">
				{props.title ? <div className="title">{props.title}</div> : null}
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderCards()}</div>
			</div>
		</div>
	);
};

export default CardProduct;
