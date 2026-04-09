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



const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("services");
    res.status(200).json({
      success: true,
      message: "all categories retrieved",
      categories,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).populate("services");

    if (!category) {
      return next(new HttpError("category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "category retrieved",
      category,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



export default { add };