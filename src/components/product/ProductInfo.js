import React from 'react';
import Button from '../../utils/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProductInfo = ({ detail }) => {
	const showProdTags = (detail) => {
		return (
			<div className="product_tags">
				{detail.shipping && (
					<div className="tag">
						<div>
							<FontAwesomeIcon icon={faTruck} />
						</div>
						<div className="tag_text">
							<div>FreeShipping</div>
							<div>And Return </div>
						</div>
					</div>
				)}
				{detail.available ? (
					<div className="tag">
						<div>
							<FontAwesomeIcon icon={faCheck} />
						</div>
						<div className="tag_text">
							<div>Availble</div>
							<div>in Store</div>
						</div>
					</div>
				) : (
					<div className="tag">
						<div>
							<FontAwesomeIcon icon={faTimes} />
						</div>
						<div className="tag_text">
							<div>not availble</div>
							<div>Preorder only</div>
						</div>
					</div>
				)}
			</div>
		);
	};
	const showProdAction = (detail) => {
		return (
			<div className="product_actions">
				<div className="price">${detail.price}</div>
				<div className="cart">
					<Button
						type="add_to_cart_link"
						runAction={() => console.log('add to cart')}
					/>
				</div>
			</div>
		);
	};
	const showProdSpecifications = (detail) => {
		return (
			<div className="product_specifications">
				<h2>Specs:</h2>
				<div>
					<div className="item">
						<strong>Frets:</strong>
						{detail.frets}
					</div>
					<div className="item">
						<strong>Wood:</strong>
						{detail.wood}
					</div>
				</div>
			</div>
		);
	};
	return (
		<div>
			<h1>{detail.name}</h1>
			<p>{detail.description}</p>
			{showProdTags(detail)}
			{showProdAction(detail)}
			{showProdSpecifications(detail)}
		</div>
	);
};

export default ProductInfo;
