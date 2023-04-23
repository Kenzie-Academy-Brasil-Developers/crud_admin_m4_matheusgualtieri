import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../error";
import { TQueryResultUserAdmin } from "../interfaces/user.interfaces";

const checkIfIsActionIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = Number(req.params.id);
  const tokenAdmin = res.locals.token.admin;
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

  if (tokenAdmin === false && userAdmin.admin === true) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default checkIfIsActionIsValidMiddleware;
