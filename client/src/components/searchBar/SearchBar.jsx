/* eslint-disable no-unused-vars */
import React from "react";
import styles from "../searchBar/SearchBar.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesName, getRecipesAll } from "../../redux/action";
import img from "../assets/food-logo.png";

function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(evt) {
    evt.preventDefault();
    setName(evt.target.value);
    setCurrentPage(1);
    // dispatch(getRecipesAll(evt.target.value));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (name) {
      dispatch(getRecipesName(name));
      setName("");
    }
  }

  return (
    <div>
      <div>
        <img className={styles.imgLogo} src={img} alt="Img Not Found"></img>
      </div>
      <input
        type="text"
        placeholder="Search Name ..."
        onChange={(evt) => handleInput(evt)}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={(evt) => handleSubmit(evt)}
      >
        Search
      </button>
    </div>
  );
}

export { SearchBar };
