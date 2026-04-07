import HttpError from "../middleware/HttpError.js";
import Category from "../model/Category.js";

const add = async (req, res, next)=> {
    try{
        const {name, description } = req.body;

        const existingCategory = await Category.findOne({ name });

        if(existingCategory){
            return next(new HttpError("category already existed", 500))
        }

        const newCategory = new Category({
            name,
            description,
        });

        await newCategory.save()

        res
        .status(201)
        .json({success: true, message: "new category added", newCategory})
        
    }catch(error){
        next(new HttpError(error.message, 500))
    }
}


export default { add };