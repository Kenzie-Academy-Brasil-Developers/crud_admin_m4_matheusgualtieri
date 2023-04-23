import { Response, Request } from "express";
import { TLogin, TToken } from "../interfaces/login.interfaces";
import createLoginService from "../services/login/createLogin.service";
import { tokenSchema } from "../schemas/login.schemas";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const login: TLogin = req.body;
  const token = await createLoginService(login);
  const validateToken: TToken = tokenSchema.parse(token);

  return res.json(validateToken);
};

export { createLoginController };
