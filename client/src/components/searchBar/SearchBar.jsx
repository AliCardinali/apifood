import React from "react";
import "./SearchBar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesName, searchBarName } from "../../redux/action";

function SearchBar() {
  const recipesAll = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(evt) {
    evt.preventDefault();
    setName(evt.target.value);
    dispatch(searchBarName(evt.target.value));
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
      <input
        type="text"
        placeholder="Search Name ..."
        onChange={(evt) => handleInput(evt)}
      />
      <button
        className="searchButton"
        type="submit"
        onClick={(evt) => handleSubmit(evt)}
      >
        Search
      </button>
    </div>
  );
}

export { SearchBar };
