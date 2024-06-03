import { v2 as cloudinary } from 'cloudinary';
import { envs } from '../../config/enviroments/enviroments.js';

const { CLOUDINARY_NAME_PROCURE, CLOUDINARY_API_KEY_PROCURE, CLOUDINARY_API_SECRET_PROCURE } = envs

cloudinary.config({
    cloud_name: CLOUDINARY_NAME_PROCURE,
    api_key: CLOUDINARY_API_KEY_PROCURE,
    api_secret: CLOUDINARY_API_SECRET_PROCURE
});

export const uploadImage = async (image, public_id) => {
    try {
        const result = await cloudinary.uploader.upload(image, { folder: "procure" })

        return result.url
    } catch (error) {
        console.log(error)
    }
}

export const deleteImage = (public_id) => {
    cloudinary.uploader.destroy(public_id, (error, { result }) => {
        if (error) {
            console.log('error', error)
            return error
        }
        console.log('result', result)
        return result
    })
}