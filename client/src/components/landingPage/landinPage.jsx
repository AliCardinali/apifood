import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div>
        <h1> Hola!!!</h1>
        <Link to="/home">
          <button>Inicio</button>
        </Link>
      </div>
    </div>
  );
}
