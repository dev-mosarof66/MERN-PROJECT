import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_NAME } from '../constants.js';
import fs from 'fs';

//configure cloudinary
cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localPath) => {
	try {
		const res = await cloudinary.uploader.upload(localPath, {
			resource_type: 'auto',
		});
		console.log('file uploaded on cloudinary.Src: ', res.url);

		// delete the file

		fs.unlinkSync(localPath);
		return res;
	} catch (error) {
		console.log("Cloudinary error : ",error);
		
		fs.unlinkSync(localPath);
		return null;
	}
};

export default uploadOnCloudinary;
