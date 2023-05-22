import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesId } from "../../redux/action";
import styles from "../detail/Detail.module.css";

import NavBar from "../navBar/NavBar.jsx";

function validate(id) {
  if (id.length <= 6 && id.length > 0) {
    for (let i = 0; i < id.length; i++) {
      if (!Number.isInteger(id[i] * 1)) return false;
    }
  } else if (id.length < 36) {
    return false;
  }
  return true;
}

function Detail(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // const detail = state.detail;
  console.log(state);
  const [id, setId] = useState("");

  function handleInput(evt) {
    evt.preventDefault();
    setId(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (validate(id)) dispatch(getRecipesId(id));
  }

  return (
    <div className={styles.container}>
      <div>
        <NavBar></NavBar>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Id ..."
          onChange={(evt) => handleInput(evt)}
        />
        <button
          className={styles.searchButton}
          type="submit"
          onClick={(evt) => handleSubmit(evt)}
        >
          Search
        </button>
        <p className={styles.par}>
          supports numbers less than 1000000 or 36 characters
        </p>
      </div>
      {state.name ? (
        <h1 className={styles.name}>{state.name}</h1>
      ) : (
        <h1 className={styles.name}>Recipe not Found</h1>
      )}
      <div className={styles.card}>
        <div className={styles.dietss}>
          <h4>Diets Types</h4>
          {state.diets?.map((diet, index) => (
            <p key={index}>{diet}</p>
          ))}
        </div>
        <div className={styles.typess}>
          <h4>Dish Types</h4>
          {state.types?.map((dish, index) => (
            <p key={index}>{dish.name ? dish.name : dish}</p>
          ))}
        </div>
      </div>
      <div className={styles.score}>
        <div className={styles.scores}>
          <h3 className={styles.h3score}>Score..:{state.score}</h3>
        </div>
        <div className={styles.scores}>
          <h3 className={styles.h3score}>Health score..:{state.healthScore}</h3>
        </div>
      </div>
      <div className={styles.summaries}>
        <div className={styles.summarysteps}>
          <h3>Summary</h3>
          <p dangerouslySetInnerHTML={{ __html: state.summary }} />
        </div>
        <div className={styles.summarysteps}>
          <h3>Steps</h3>
          <p>{state.steps}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
