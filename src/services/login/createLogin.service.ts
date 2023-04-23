import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { TLogin, TToken } from "../../interfaces/login.interfaces";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import "dotenv/config";
import {
  TQueryResultUserWithPassword,
  TUser,
} from "../../interfaces/user.interfaces";

const createLoginService = async (loginData: TLogin): Promise<TToken> => {
  const queryTemplate: string = `
    SELECT * FROM users WHERE email = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [loginData.email],
  };
  const result: TQueryResultUserWithPassword = await client.query(queryConfig);
  const userLoginData: TUser = result.rows[0];

  if (!userLoginData) {
    throw new AppError("Wrong email/password", 401);
  }

  const pwdMatch: boolean = await compare(
    loginData.password,
    userLoginData.password
  );

  if (!pwdMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    { admin: userLoginData.admin },
    process.env.SECRET_KEY!,
    { expiresIn: "1d", subject: String(userLoginData.id) }
  );

  return { token };
};

export default createLoginService;
