import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate=useNavigate();

  return (
    <nav className="bg-blue-800 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="font-bold text-3xl text-white">RentIt</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <button className="bg-transparent border border-white text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-white hover:text-blue-800 transition-all"
            onClick={()=>(navigate('/postproperty'))}
            >
              Add Post
            </button>
          </li>
          <li>
            <button className="bg-white text-blue-800 px-5 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">
              Dashboard
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-blue-900 py-4 space-y-3 transition-all">
          <li>
            <button className="bg-transparent border border-white text-white px-5 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-all"
            onClick={()=>(navigate('/postproperty'))}>
              Add Post
            </button>
          </li>
          <li>
            <button className="bg-white text-blue-800 px-5 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">
              Dashboard
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
