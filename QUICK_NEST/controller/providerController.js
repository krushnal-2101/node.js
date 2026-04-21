import User from "../model/User.js";
import HttpError from "../middleware/HttpError.js";
import Service from "../model/Services.js";
import Provider from "../model/Provider.js";

const registerProvider = async (req, res, next)=> {
    try{
        const id  = req.params._id;

        const user = await User.findById(userId)

        if(!user){
            return next(new HttpError("user not found", 404))
        }

        const existingProvider = await Provider.findById(userId)

        if(existingProvider){
            return next(new HttpError("already provider register with this is", 500))
        }

        const { Service, experience, documents} = req.body

        if(!services || !Array.isArray(services) || service.length === 0){
            return next(new HttpError("service is required", 500))
        }

        const validService = await services({
            _id: { $in: services}
        }).select("_id")

        if(validService.length !== services.length){
            return next(new HttpError("service are missing"))
        }


        const newProvider = new Provider({
            userId,
            services: validService,
            experience,
            documents
        })

        user.role = "provider"

        await new Provider.save();

        res.statu(201).json({ success : true, message: " provider account  registered  wait for admin approval", newProvider})

    }catch(error){
        next(new HttpError(error.message, 500))
    }
} 



export default { registerProvider }