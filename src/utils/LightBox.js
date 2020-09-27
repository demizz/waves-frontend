import React, { useState, useEffect } from 'react';
import LightBox from 'react-images';
const ImageLightBox = (props) => {
	const [lightboxIsOpen, setLightboxIsOpen] = useState(props.open);
	const [currentImage, setCurrentImage] = useState(props.pos);
	const [Images, setImages] = useState([]);

	if (props.images && Images.length > 0) {
		const img = [];
		props.images.forEach((element) => {
			img.push({ src: `${element}` });
		});
		setImages(img);
	}

	const closeLightBox = () => {
		props.onClose();
	};
	const gotoPrevious = () => {
		setCurrentImage((prevCurrent) => prevCurrent - 1);
	};
	const gotoNext = () => {
		setCurrentImage((prevCurrent) => prevCurrent + 1);
	};
	return (
		<LightBox
			currentImage={currentImage}
			isOpen={lightboxIsOpen}
			images={Images}
			onClickPrev={gotoPrevious}
			onClickNext={gotoNext}
			onClose={closeLightBox}
		/>
	);
};

export default ImageLightBox;
