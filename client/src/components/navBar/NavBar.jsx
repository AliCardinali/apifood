import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navigation">
      <div className="contimg"></div>
      <div>
        <Link to="/home">
          <button className="btn-neon">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
