import React from 'react';
import Slider from 'react-slick';
import Button from '../../utils/Button';
const HomeSlider = () => {
	const slides = [
		{
			img: '/images/featured/featured_home.jpg',
			lineOne: 'Fender',
			lineTwo: 'Custom shop',
			linkTitle: 'Shop now',
			linkTo: '/shop',
		},
		{
			img: '/images/featured/featured_home_2.jpg',
			lineOne: 'B_stock',
			lineTwo: 'Awesome discounts',
			linkTitle: 'view offers',
			linkTo: '/shop',
		},
	];
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};
	const generateSlides = () => {
		return slides
			? slides.map((item, i) => {
					return (
						<div key={i}>
							<div
								className="featured_image"
								style={{
									background: `url(${item.img})`,
									height: `${window.innerHeight}px`,
								}}
							>
								<div className="featured_action">
									<div className="tag title">{item.lineOne}</div>
									<div className="tag low_title">{item.lineTwo}</div>
									<div>
										<Button
											type="default"
											title={item.linkTitle}
											linkTo={item.linkTo}
											addStyle={{ margin: '10px 0 0 0' }}
										/>
									</div>
								</div>
							</div>
						</div>
					);
			  })
			: null;
	};
	return (
		<div className="features_container">
			<Slider {...settings}>{generateSlides()}</Slider>
		</div>
	);
};

export default HomeSlider;
