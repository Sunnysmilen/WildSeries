import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Itemstype = {
  id: number;
  title: string;
  user_id: number;
};
export default function Items() {
  const { id } = useParams();
  const [items, setItems] = useState<Itemstype[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`)
      .then((response) => response.json())
      .then((data: Itemstype[]) => {
        setItems(data);
      });
  }, [id]);

  return (
    <>
      {" "}
      {items.map((i) => {
        i.title;
      })}
    </>
  );
}
