import { v2 as cloudinary } from "cloudinary";
import serverConfig from "./config";
cloudinary.config({
  cloud_name: serverConfig.cloudinary.cloudName,
  api_key: serverConfig.cloudinary.apiKey,
  api_secret: serverConfig.cloudinary.apiSecret,
  secure: true,
});
export const cloudinaryUpload = async (photo: string) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(photo, {
      upload_preset: "profileForm",
    });
    console.log("successfully uploaded image to cloudinary");
    const { url } = uploadResponse;
    console.log(url);
    return url;
  } catch (error) {
    throw new Error("Error Creating photo");
  }
};
