import { Router } from "express";
import { CartController } from "../controllers/cart.js";


const cartRouter = Router();

cartRouter.get("/:id", CartController.getCart);
cartRouter.post(`/add`, CartController.addToCart);
cartRouter.put(`/add`, CartController.updateCart);
cartRouter.put(`/:id`, CartController.updateCartItemQuantity);
cartRouter.put(`/remove`, CartController.removeFromCart);


export default cartRouter;
