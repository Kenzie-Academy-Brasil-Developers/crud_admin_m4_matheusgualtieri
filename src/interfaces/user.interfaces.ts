import { z } from "zod";
import { QueryResult } from "pg";
import {
  userSchema,
  userSchemaActive,
  userSchemaAdmin,
  userSchemaPartial,
  userSchemaPartialRequest,
  userSchemaRequest,
  userSchemaResponse,
} from "../schemas/user.schemas";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TUserActive = z.infer<typeof userSchemaActive>;
type TUserAdmin = z.infer<typeof userSchemaAdmin>;
type TUserPartial = z.infer<typeof userSchemaPartial>;
type TUserPartialRequest = z.infer<typeof userSchemaPartialRequest>;

type TQueryResultUser = QueryResult<TUserResponse>;
type TQueryResultUserActive = QueryResult<TUserActive>;
type TQueryResultUserAdmin = QueryResult<TUserAdmin>;
type TQueryResultUserWithPassword = QueryResult<TUser>;

export {
  TUser,
  TQueryResultUser,
  TUserRequest,
  TUserResponse,
  TUserActive,
  TQueryResultUserActive,
  TQueryResultUserAdmin,
  TUserAdmin,
  TUserPartial,
  TUserPartialRequest,
  TQueryResultUserWithPassword,
};
