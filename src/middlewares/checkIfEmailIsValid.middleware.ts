import { Request, Response, NextFunction, query } from "express";
import { QueryConfig } from "pg";
import { TQueryResultUser } from "../interfaces/user.interfaces";
import { client } from "../database";
import { AppError } from "../error";

const checkIfEmailIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = req.body.email;

  const queryTemplate: string = `
    SELECT * FROM users WHERE email = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [email],
  };
  const result: TQueryResultUser = await client.query(queryConfig);
  const user = result.rows[0];
  if (user) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

export default checkIfEmailIsValidMiddleware;
