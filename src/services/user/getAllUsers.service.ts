import {
  TQueryResultUser,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { client } from "../../database";
import {} from "../../interfaces/user.interfaces";

const getAllUsersService = async (): Promise<Array<TUserResponse>> => {
  const queryTemplate: string = `
    SELECT
        id,
        name,
        email,
        admin,
        active
    FROM
        users;
    `;
  const result: TQueryResultUser = await client.query(queryTemplate);
  const allUsers: TUserResponse[] = result.rows;

  return allUsers;
};

export default getAllUsersService;
