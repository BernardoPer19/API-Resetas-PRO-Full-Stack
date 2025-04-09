import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-pink-800 p-5 max-w-full">
      <ul className="flex text-white gap-4 justify-end p-2 max-w-[1580px]">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recetas">Recipes</Link>
        </li>
        <li>
          <Link to="/profile">Ur Accont</Link>
        </li>
        <li>
          <Link to="/register">
            <span className="px-4 py-2 text-pink-800 bg-white font-bold rounded-2xl hover:px-5 hover:py-3 transition ">
              Registrarse
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
