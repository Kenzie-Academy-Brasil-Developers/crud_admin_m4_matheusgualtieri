import { NextFunction, Request, Response } from "express";
import { TQueryResultUserAdmin } from "../interfaces/user.interfaces";
import { client } from "../database";
import { AppError } from "../error";
import { QueryConfig } from "pg";

const checkIfIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = res.locals.token.id;

  const queryTemplate: string = `
SELECT 
    admin
FROM
    users
WHERE
    id = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userId],
  };
  const result: TQueryResultUserAdmin = await client.query(queryConfig);
  const userAdmin = result.rows[0];

  if (!userAdmin.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default checkIfIsAdminMiddleware;
