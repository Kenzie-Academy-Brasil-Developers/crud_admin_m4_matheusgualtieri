import {
  TQueryResultUser,
  TUserActive,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { client } from "../../database";
import { QueryConfig } from "pg";
import { userSchemaResponse } from "../../schemas/user.schemas";
import format from "pg-format";

const activeUserService = async (userId: number): Promise<TUserResponse> => {
  const userData: TUserActive = { active: true };
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
  console.log(newUser);
  return newUser;
};

export default activeUserService;
