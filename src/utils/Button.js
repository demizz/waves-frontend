import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';
const Button = (props) => {
	const button = () => {
		if (props.type === 'default') {
			return (
				<Link
					to={props.linkTo}
					{...props.addStyles}
					className={!props.altClass ? 'link_default' : props.altClass}
				>
					{props.title}
				</Link>
			);
		}
		if (props.type === 'bag_link') {
			return (
				<div onClick={props.runAction} className="bag_link">
					<FontAwesomeIcon icon={faShoppingBag} />
				</div>
			);
		}
		if (props.type === 'add_to_cart_link') {
			return (
				<div className="add_to_cart_link" onClick={props.runAction}>
					Add To Cart <FontAwesomeIcon icon={faShoppingBag} />
				</div>
			);
		}
	};
	return <div className="my_link">{button()}</div>;
};

export default Button;
