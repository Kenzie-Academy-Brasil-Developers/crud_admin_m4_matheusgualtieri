import format from "pg-format";
import {
  TQueryResultUser,
  TUserRequest,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { client } from "../../database";
import { userSchemaResponse } from "../../schemas/user.schemas";
import { hash } from "bcryptjs";

const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const hashedPassword = await hash(userData.password, 10);
  userData.password = hashedPassword;
  const queryTemplate: string = format(
    `
    INSERT INTO
        users
        (%I)
    VALUES
        (%L)
    RETURNING *;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const result: TQueryResultUser = await client.query(queryTemplate);
  const newUser = userSchemaResponse.parse(result.rows[0]);

  return newUser;
};

export default createUserService;
