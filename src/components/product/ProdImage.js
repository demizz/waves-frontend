import React, { useState, useEffect, useCallback } from 'react';
import ImageLightBox from '../../utils/LightBox';
const ProdImage = ({ detail }) => {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [imagePos, setImagePos] = useState(0);
	const [lightboxImages, setLightboxImages] = useState([]);

	const change = () => {
		if (detail.images.length > 0) {
			let lightboxImg = [];
			detail.images.forEach((item) => {
				lightboxImg.push(item);
			});
			setLightboxImages(lightboxImg);
		}
	};
	useCallback(change(), []);

	const renderCardImages = (images) => {
		if (images.length > 0) {
			console.log(images[0]);
			return images[0];
		} else {
			return `/images/image_not_available.png`;
		}
	};
	console.log(lightboxImages);
	const handleLightBox = (position) => {
		if (lightboxImages.length > 0) {
			setLightboxOpen(true);
			setImagePos(position);
		}
	};
	const handleLightBoxClose = () => {
		setLightboxOpen(false);
	};
	const showThumbs = () => {
		return lightboxImages.map((item, i) => {
			console.log(item);
			return (
				<div
					key={i}
					onClick={handleLightBox(i)}
					className="thumb"
					style={{
						background: `url(${item})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				></div>
			);
		});
	};
	return (
		<div className="product_image_container">
			<div className="main_pic">
				<div
					style={{
						background: `url(${renderCardImages(detail.images)})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
					onClick={handleLightBox}
				></div>
			</div>
			<div className="main_thumbs">{showThumbs()}</div>
			{lightboxOpen && (
				<ImageLightBox
					id={detail._id}
					pos={imagePos}
					images={lightboxImages}
					open={lightboxOpen}
					onClose={handleLightBoxClose}
				/>
			)}
		</div>
	);
};

export default ProdImage;
