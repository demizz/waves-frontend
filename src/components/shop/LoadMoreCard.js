import React from 'react';
import CardShop from '../../utils/CardShop';
const LoadMoreCard = (props) => {
	return (
		<div>
			<div>
				<CardShop grid={props.grid} list={props.list} />
			</div>
			{props.size > 0 && props.size >= props.limit ? (
				<div className="load_more_container">
					<span onClick={props.loadMore}>Load More</span>
				</div>
			) : null}
		</div>
	);
};

export default LoadMoreCard;
