import Category  from "../models/categoryModel.js"

const createcategory =  async (req, res) => {
    try{
        const { name} = req.body;
        const cat = await Category.create({ name })
        res.status(201).json(cat);
    }catch(err) {
        res.status(500).json({ message: err.message})
    }
}
