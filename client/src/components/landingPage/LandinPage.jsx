import React from "react";
import { Link } from "react-router-dom";
import video from "../assets/zanahoria.mp4";
import style from "../landingPage/LandingPage.css";

export default function LandingPage() {
  return (
    <div className={style.container}>
      <video className={style.video} autoPlay loop muted>
        <source src={video} type="video/mp4"></source>
      </video>
      <div className={style.title}>
        <h1>"Bienvenidos!!</h1>
        <h2>T.</h2>

        <Link to="/home">
          <button>Inicio</button>
        </Link>
      </div>
      <div className={style.overlay}></div>
    </div>
  );
}
