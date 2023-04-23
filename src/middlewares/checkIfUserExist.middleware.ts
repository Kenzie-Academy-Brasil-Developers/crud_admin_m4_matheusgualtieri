import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { TQueryResultUser } from "../interfaces/user.interfaces";
import { client } from "../database";
import { AppError } from "../error";

const checkIfUserExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryTemplate: string = `
    SELECT * FROM users WHERE id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };

  const result: TQueryResultUser = await client.query(queryConfig);
  if (result.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default checkIfUserExistMiddleware;
