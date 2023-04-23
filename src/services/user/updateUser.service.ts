import format from "pg-format";
import {
  TQueryResultUser,
  TUserPartialRequest,
  TUserRequest,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { client } from "../../database";
import { userSchemaResponse } from "../../schemas/user.schemas";
import { hash } from "bcryptjs";
import { QueryConfig } from "pg";

const updateUserService = async (
  userData: TUserPartialRequest,
  userId: number
): Promise<TUserResponse> => {
  if (userData.password) {
    const hashedPassword = await hash(userData.password, 10);
    userData.password = hashedPassword;
  }
  const queryTemplate: string = format(
    `
    UPDATE
      users
      SET(%I) = ROW(%L)
    WHERE
      id = $1
    RETURNING 
      id,
      name,
      email,
      admin,
      active;
    `,
    Object.keys(userData),
    Object.values(userData)
  );
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userId],
  };
  const result: TQueryResultUser = await client.query(queryConfig);
  const newUser = userSchemaResponse.parse(result.rows[0]);
  return newUser;
};

export default updateUserService;
