import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Category = {
  id: number;
  name: string;
  programs: Program[];
};

type Program = {
  id: number;
  title: string;
};

export default function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategory(data);
      });
  }, [id]);

  return (
    <>
      <h1>Welcome to categories</h1>
      <ul>
        {category.map((c) => (
          <li key={id}>{c.name}</li>
        ))}
      </ul>
    </>
  );
}
