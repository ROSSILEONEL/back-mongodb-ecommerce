import { Router } from "express";

import { ProductsController } from "../controllers/products.js";

const productRouter = Router();

productRouter.get("/", ProductsController.getAllProducts);

productRouter.get("/:id", ProductsController.getProductById);

productRouter.post("/add", ProductsController.addProduct);

productRouter.put("/update", ProductsController.updateProduct);

productRouter.delete("/delete", ProductsController.deleteProduct);

export default productRouter;
