import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";
type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  static readAll() {
    throw new Error("Method not implemented.");
  }
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories
    return rows as Category[];
  }
}
export default new CategoryRepository();
