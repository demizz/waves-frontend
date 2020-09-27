import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
const FileUpload = (props) => {
	const jwt = localStorage.getItem('jwt');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const showUploadedImages = () => {};
	const onDrop = async (files) => {
		console.log(files);
		setUploading(true);
		const formdata = new FormData();
		formdata.append('file', files[0]);
		try {
			const response = await axios({
				url: 'http://127.0.0.1:8000/api/v1/product/article/uploadImage',
				method: 'POST',
				data: formdata,
				headers: {
					authentication: 'Bearer ' + jwt,
				},
			});
			if (response.status === 'success') {
				console.log(response.data);
				setUploading(false);
				setUploadedFiles([...uploadedFiles, response.data]);
				props.imagesHandler(uploadedFiles);
			}
		} catch (err) {
			setUploading(false);
			console.log(err.response.data.message);
		}
	};
	return (
		<div>
			<section>
				<div className="dropzone clear">
					<Dropzone onDrop={onDrop} multiple={false} className="dropzone_box">
						<div className="wrap">
							<FontAwesomeIcon icon={faPlusCircle} />
						</div>
					</Dropzone>
					{showUploadedImages}
					{uploading && (
						<div
							className="dropzone_box"
							style={{ textAlign: 'center', paddingTop: '60px' }}
						>
							<CircularProgress style={{ color: '#00bcd4' }} thickness={4} />
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default FileUpload;
