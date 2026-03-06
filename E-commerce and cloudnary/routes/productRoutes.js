import express from "express"


const router = express.Router()

router.post("/add", UploadStream.single("image", productsController.createProduct))

router.get("/allproducts", productsController.allProducts);

router.get("/:id", productsController.getProduct);

router.delete("/:id", productsController.deleteProduct)

router.patch(
    "/:id",
    uploads.single("image"),
    productsController.updateProductData,
)

export default router;