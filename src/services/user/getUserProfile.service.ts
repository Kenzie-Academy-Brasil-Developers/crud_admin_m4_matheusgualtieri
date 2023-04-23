import { QueryConfig } from "pg";
import { client } from "../../database";
import {
  TUserResponse,
  TQueryResultUser,
} from "../../interfaces/user.interfaces";

const getUserProfileService = async (
  userId: number
): Promise<TUserResponse> => {
  const queryTemplate: string = `
      SELECT
        id,
        name,
        email,
        admin,
        active
      FROM
        users
      WHERE
        id = $1;
      `;
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userId],
  };
  const result: TQueryResultUser = await client.query(queryConfig);
  const user: TUserResponse = result.rows[0];

  return user;
};

export default getUserProfileService;
