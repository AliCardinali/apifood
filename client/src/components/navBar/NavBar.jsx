import React from "react";
import { Link } from "react-router-dom";
import styles from "../navBar/NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.navigation}>
      <div className={styles.contimg}></div>
      <div>
        <Link to="/home">
          <button className={styles.btnNeon}>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
