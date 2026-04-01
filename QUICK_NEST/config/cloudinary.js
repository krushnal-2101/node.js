import dotenv from  "dotenv";
dotenv.config({path: "./.env"})
import pkg from "cloudinary";
const { v2: cloudinary} = pkg;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.evn.API_SECRET
})

export default cloudinary