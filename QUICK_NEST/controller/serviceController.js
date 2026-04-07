import HttpError from "../middleware/HttpError.js";
import Category from "../model/Category.js";
import Service from "../model/Services.js";

const add  = async(req, res, next)=> {
   try{
     const {name, description, price, duration, isActive, category} = req.body;
     
     const existingService = await Service.findOne({ name })

     if (existingService){
        return next(new HttpError("service is already exist", 500))
     }
     const existingServices = await Category.findById(category);

     if(!existingServices){
        return next(new HttpError("category is existed", 500))
     }

     const newService = new Service({
        name,
        description,
        price,
        duration,
        isActive,
        category,
     })

     await newServic.save()

     res
     .status(201)
     .json({success: true, message: "new service added", newService})
   }catch (error){
    next(new HttpError(error.message, 500))
   }
}

export default { add }