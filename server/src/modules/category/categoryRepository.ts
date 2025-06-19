import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    // dans les lignes de codes select tu récupère en premier les sous catégories recherché et ensuite tu réunis avec la catégorie géneral via les id
    const [rows] = await databaseClient.query<Rows>("select * from category");
    return rows as Category[];
  }

  async read(parsedId: number) {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    // dans les lignes de codes select tu récupère en premier les sous catégories recherché et ensuite tu réunis avec la catégorie géneral via les id
    const [rows] = await databaseClient.query<Rows>(
      `
      select 
        category.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", program.id, "title", program.title
          )
        ) as programs 
      from 
        category 
        left join program on program.category_id = category.id 
      where 
        category.id = ? 
      group by 
        category.id
      `,
      [parsedId],
    );

    // Return the array of categories
    return rows[0] as Category;
  }

  async update(category: Category) {
    const [result] = await databaseClient.query<Result>(
      "update category set name = ? where id = ?",
      [category.name, category.id],
    );
    return result.affectedRows;
  }
}
export default new CategoryRepository();
