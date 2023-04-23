import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { TQueryResultUserActive } from "../interfaces/user.interfaces";
import { client } from "../database";
import { AppError } from "../error";

const checkIfUserIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.id;

  const queryTemplate: string = `
    SELECT active FROM users WHERE id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };

  const result: TQueryResultUserActive = await client.query(queryConfig);
  const userActive = result.rows[0];
  console.log(userActive.active);
  if (userActive.active) {
    throw new AppError("User already active", 400);
  }

  return next();
};

export default checkIfUserIsActiveMiddleware;
