import format from "pg-format";
import { TUserActive } from "../../interfaces/user.interfaces";
import { QueryConfig } from "pg";
import { client } from "../../database";

const deleteUserService = async (userId: number): Promise<void> => {
  const userData: TUserActive = { active: false };
  const queryTemplate: string = format(
    `
    UPDATE
        users
        SET(%I) = ROW(%L)
    WHERE
        id = $1;
    `,
    Object.keys(userData),
    Object.values(userData)
  );
  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userId],
  };
  await client.query(queryConfig);
};

export default deleteUserService;
