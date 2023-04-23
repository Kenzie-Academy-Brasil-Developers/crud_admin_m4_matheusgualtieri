import { Router } from "express";
import checkIfEmailIsValidMiddleware from "../middlewares/checkIfEmailIsValid.middleware";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";
import { userSchemaPartial, userSchemaRequest } from "../schemas/user.schemas";
import {
  activeUserController,
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserProfileController,
  updateUserController,
} from "../controllers/user.controller";
import checkIfTokenIsValid from "../middlewares/checkIfTokenIsValid.middleware";
import checkIfIsAdminMiddleware from "../middlewares/checkIfIsAdmin.middleware";
import checkIfUserExistMiddleware from "../middlewares/checkIfUserExist.middleware";
import checkIfUserIsActiveMiddleware from "../middlewares/checkIfUserIsActive.middleware";
import checkIfIsActionIsValidMiddleware from "../middlewares/checkIfActionIsValid.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkIfEmailIsValidMiddleware,
  validateBodyMiddleware(userSchemaRequest),
  createUserController
);

userRoutes.get(
  "",
  checkIfTokenIsValid,
  checkIfIsAdminMiddleware,
  getAllUsersController
);

userRoutes.get("/profile", checkIfTokenIsValid, getUserProfileController);

userRoutes.patch(
  "/:id",
  checkIfTokenIsValid,
  checkIfIsActionIsValidMiddleware,
  checkIfEmailIsValidMiddleware,
  checkIfUserExistMiddleware,
  validateBodyMiddleware(userSchemaPartial),
  updateUserController
);

userRoutes.delete(
  "/:id",
  checkIfTokenIsValid,
  checkIfUserExistMiddleware,
  checkIfIsActionIsValidMiddleware,
  deleteUserController
);

userRoutes.put(
  "/:id/recover",
  checkIfTokenIsValid,
  checkIfIsAdminMiddleware,
  checkIfUserExistMiddleware,
  checkIfUserIsActiveMiddleware,
  activeUserController
);

export default userRoutes;
