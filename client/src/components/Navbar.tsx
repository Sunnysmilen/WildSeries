import { Link } from "react-router";

export default function Navbar() {
  return (
    <>
      <Link to="/">Accueil</Link>
      <Link to="/programs">Programs</Link>
      <Link to="/categories">Categories</Link>
    </>
  );
}
