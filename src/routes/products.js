import { Router } from "express";

import { ProductsController } from "../controllers/products.js";

const productRouter = Router();

productRouter.get("/", ProductsController.getAllProducts);

productRouter.get("/:id", ProductsController.getProductById);

productRouter.post("/add", ProductsController.addProduct);

productRouter.put("/update/:id", ProductsController.updateProduct);

productRouter.delete("/delete/:id", ProductsController.deleteProduct);

export default productRouter;
