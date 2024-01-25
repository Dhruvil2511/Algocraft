import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERET,
});

async function uploadOnCloudinary(localPath) {
    try {
        if (!localPath) return null;
        //upload file
        const response = await cloudinary.uploader.upload(localPath, { resource_type: "auto" });

        // file loaded succesfully
        console.log("File uploaded successfully.", response.url);

        return response;
    } catch (error) {
        fs.unlinkSync(localPath); // removes the file from local server
    }
}
