import { useState } from "react";
// import Image from "./Image";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
        
      {/* <span className="title">ekansh NA</span> */}

      <div className="mobile-menu">
        <div className="menu-icon" onClick={() => setOpen((prev) => !prev)}>
          <div className={`bar ${open ? "rotate-45" : ""}`}></div>
          <div className={`bar ${open ? "hidden" : ""}`}></div>
          <div className={`bar ${open ? "-rotate-45" : ""}`}></div>
        </div>

        <div className={`mobile-links ${open ? "show" : "hide"}`}>
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>
            Trending
          </Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>
            Most Popular
          </Link>
          <Link to="/" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      </div>

      <div className="desktop-menu">
        <Link to="/" style={{ fontSize: '2rem' }}>📑</Link>
      </div>
    </div>
  );
};

export default Navbar;
