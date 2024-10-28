import { Router } from "express";
import { UsersController } from "../controllers/users.js";
const usersRouter = Router();


usersRouter.get("/",UsersController.getAllUsers);
usersRouter.get("/:id", UsersController.getUserById);
usersRouter.post("/add", UsersController.addUser);
usersRouter.put("/:id", UsersController.updateUser);
usersRouter.delete("/:id", UsersController.deleteUser);

export default usersRouter;




