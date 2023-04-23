import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";
import { loginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  validateBodyMiddleware(loginSchema),
  createLoginController
);

export default loginRoutes;
