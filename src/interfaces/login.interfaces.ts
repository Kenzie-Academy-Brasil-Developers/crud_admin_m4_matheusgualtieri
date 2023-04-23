import { z } from "zod";
import { loginSchema, tokenSchema } from "../schemas/login.schemas";
import { QueryResult } from "pg";

type TLogin = z.infer<typeof loginSchema>;
type TToken = z.infer<typeof tokenSchema>;

type TQueryResultLogin = QueryResult<TLogin>;

export { TLogin, TToken, TQueryResultLogin };
