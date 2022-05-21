import { Router } from "express";
import { AuthenticateUserController } from "./modules/account/AuthenticateUserController";
import { CreateUserController } from "./modules/users/useCaseCreate/CreateUserController";
import { ensureAuthenticateUser } from "./middleware/ensoureAuthenticateUser";
import { UpdateUserController } from "./modules/users/useCaseUpdate/UpdateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserController = new UpdateUserController();


routes.post("/auth/", authenticateUserController.handle);
routes.post("/user/", createUserController.handle);
routes.put("/user/update", ensureAuthenticateUser, updateUserController.handle);


export { routes };