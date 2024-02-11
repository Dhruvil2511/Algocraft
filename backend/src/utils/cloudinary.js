import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(localPath) {
    try {
        if (!localPath) return null;
        //upload file
        const response = await cloudinary.uploader.upload(localPath, {
            eager: [{ width: 460, height: 460, crop: "thumb", zoom: "1", fetch_format: "auto" }],
            resource_type: "image",
        });

        return response;
    } catch (error) { 
        console.error("Error uploading file on cloud", error);
    } finally {
        fs.unlinkSync(localPath);
    }
}

export { uploadOnCloudinary };
