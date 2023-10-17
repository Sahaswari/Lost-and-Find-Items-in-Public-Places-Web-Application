import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          <Link to="/Electronic">Find Your Lost Items</Link>
        </h1>
        {path === "/Electronic" && (
          <div className="flex items-center space-x-2">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="px-4 py-2 bg-white text-gray-800 rounded-lg"
              placeholder="Search a post"
              type="text"
            />
            <button
              onClick={() =>
                navigate(prompt ? "?search=" + prompt : navigate("/Electronic"))
              }
              className="bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <BsSearch />
            </button>
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-4">
          {user ? (
            <h3>
              <Link to="/write" className="text-white hover:underline">
                Write
              </Link>
            </h3>
          ) : (
            <h3>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu} className="relative">
              <p className="cursor-pointer text-white">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </h3>
          )}
        </div>
        <div
          onClick={showMenu}
          className="md:hidden text-2xl cursor-pointer text-white"
        >
          <p className="cursor-pointer relative">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
