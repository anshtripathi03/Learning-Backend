import { v2 } from "cloudinary";
import fs from "fs"

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const UploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null;

            const res = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            fs.unlink(localFilePath);
            return res;

        } catch (error) {
            fs.unlink(localFilePath);
            return null;
        }
    }

    export {UploadOnCloudinary}