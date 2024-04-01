import { Router } from 'express';
import { saveProduct, getProducts, updateProduct, deleteProduct } from '../Controllers/Products.controller.js'
const productRouter = Router();
import isLoggedIn from '../Middleware/Auth.middleware.js';

productRouter.post("/add-products",isLoggedIn, saveProduct)
productRouter.get("/get-products",isLoggedIn, getProducts)
productRouter.put("/update-product/:id",isLoggedIn, updateProduct)
productRouter.delete("/delete-product/:id",isLoggedIn, deleteProduct)
export default productRouter;