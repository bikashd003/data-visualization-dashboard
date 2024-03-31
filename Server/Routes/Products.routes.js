import { Router } from 'express';
import { saveProduct, getProducts, updateProduct, deleteProduct } from '../Controllers/Products.controller.js'
const productRouter = Router();

productRouter.post("/add-products", saveProduct)
productRouter.get("/get-products", getProducts)
productRouter.put("/update-product/:id", updateProduct)
productRouter.delete("/delete-product/:id", deleteProduct)
export default productRouter;