import { Router } from "express";
import { CartController } from "../controllers/cart.js";
import { verifyToken } from "../utils/auth.js";


const cartRouter = Router();

cartRouter.get("/:id",verifyToken,CartController.getCart);
cartRouter.post(`/add`, CartController.addToCart);
cartRouter.put(`/add`, CartController.updateCart);
cartRouter.put(`/:id`, CartController.updateCartItemQuantity);
cartRouter.put(`/remove`, CartController.removeFromCart);


export default cartRouter;
