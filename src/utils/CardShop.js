import React from 'react';
import Card from './Card';
const CardShop = (props) => {
	const renderCards = () => {
		return props.list
			? props.list.map((item) => (
					<Card key={item._id} grid={props.grid} {...item} />
			  ))
			: null;
	};
	return (
		<div className="card_block_shop">
			<div>
				<div>
					{props.list ? (
						props.list.length === 0 ? (
							<div className="no_result">sorry,no results</div>
						) : null
					) : null}
					{renderCards(props.list)}
				</div>
			</div>
		</div>
	);
};

export default CardShop;
