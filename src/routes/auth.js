import Router from "express";
import { loginController } from "../controllers/login.js";
import { verifyToken } from "../utils/auth.js";
const authRouter = Router();

authRouter.post("/signIn",loginController.signIn);
authRouter.post("/logout",loginController.logout);
authRouter.get('/admin', verifyToken, (req, res) => {

    res.send({message:"admin con acceso",payload:req.user})
})


export default authRouter
