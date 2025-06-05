import { useEffect, useState } from "react";

//  const URL = process.env.VITE_API_URL;
console.log(import.meta.env.VITE_API_URL);
type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

export default function Programs() {
  const [program, setProgram] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setProgram(data);
      });
  }, []);

  return (
    <>
      <h1>Discover all our programs</h1>
      <ul>
        {program.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </>
  );
}
