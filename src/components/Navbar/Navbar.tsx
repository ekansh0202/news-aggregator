import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="desktop-menu">
        <Link to="/" style={{ fontSize: '2rem' }}>📑</Link>
      </div>
    </div>
  );
};

export default Navbar;
