import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type User = {
  id: number;
  email: string;
  password: string;
};

class UserRepository {
  // CREATE
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (email, password) values (?, ?)",
      [user.email, user.password],
    );
    return result.insertId;
  }

  // READ
  async readAll() {
    const [rows] = await databaseClient.query("select * from user");
    return rows as User[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );
    return rows[0] as User;
  }

  // UPDATE

  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET email = ? , password = ? where id = ?",
      [user.email, user.password, user.id],
    );
    return result.affectedRows;
  }

  // DELETE

  async delete(userId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE from user where id = ?",
      [userId],
    );
    return result.affectedRows;
  }
}

export default new UserRepository();
