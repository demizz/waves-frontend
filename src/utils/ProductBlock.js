import React from 'react';

const ProductBlock = ({ removeItem, products, userData }) => {
	const renderCartImage = (images) => {
		if (images.length > 0) {
			return images[0];
		} else {
			return `images/image_not_availble.png`;
		}
	};
	const renderItems = () => {
		return products.map((item) => {
			return (
				<div key={item._id} className="user_product_block">
					<div className="item">
						<div
							style={{
								background: `url(${renderCartImage(item.images)})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
							}}
							className="image"
						></div>
					</div>
					<div className="item">
						<h4>product name</h4>
						<div>{item.name}</div>
					</div>
					<div className="item">
						<h4>product quantiy</h4>
						<div>{item.quantity}</div>
					</div>
					<div className="item">
						<h4>price</h4>
						<div>{item.price}</div>
					</div>
					<div className="item btn">
						<div
							className="cart_remove_btn"
							onClick={() => removeItem(item._id)}
						>
							remove
						</div>
					</div>
				</div>
			);
		});
	};
	return <div>{renderItems()}</div>;
};

export default ProductBlock;
