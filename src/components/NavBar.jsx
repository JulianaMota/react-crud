import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const NavBar = () => {
  return (
    <nav>
      <div className="links nav">
        <div className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link" to="/create">
            Add Game
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
