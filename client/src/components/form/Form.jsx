/* eslint-disable no-undef */
import React from "react";
import { getTypes, postRecipes, getDatabase } from "../../redux/action";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar.jsx";
import styles from "../form/Form.module.css";
import { validate } from "../../validation";

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const type = useSelector((state) => state.types);
  const allState = useSelector((state) => state.recipesAll);
  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    score: 0,
    healthScore: 0,
    image: "",
    steps: "",
    diets: [],
  });
  console.log(type);
  const [input, setInput] = useState({
    title: "",
    summary: "",
    score: 0,
    healthScore: 0,
    image: "",
    steps: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      setErrors(validate({ newInput }));
      return newInput;
    });
  };

  function handleSelect(evt) {
    if (!input.diets.includes(evt.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, evt.target.value],
      });
    }
    console.log(input);
  }

  function handleNumber(evt) {
    try {
      const parsValue = parseInt(evt.target.value);
      if (Number.isInteger(parsValue) && parsValue >= 0 && parsValue <= 99) {
        setInput({
          ...input,
          [evt.target.name]: parsValue,
        });
      }
    } catch {
      console.log("error de parseo");
    }
    console.log(input);
  }

  function handleDelete(evt) {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== evt),
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(postRecipes(input));
    setInput({
      title: "",
      summary: "",
      score: 0,
      healthScore: 0,
      image:
        "https://vegano.club/wp-content/uploads/2019/11/comidas-veganas.jpg",
      steps: "",
      diets: [],
    });
  }

  return (
    <div className={styles.divForm}>
      <div>
        <NavBar></NavBar>
      </div>
      <form
        className={styles.formRegister}
        onSubmit={(evt) => handleSubmit(evt)}
      >
        <div>
          <label>Name</label>
          <input
            className={styles.controls}
            type="text"
            value={input.title}
            name="title"
            onChange={(evt) => handleChange(evt)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div>
          <label>Summary</label>
          <input
            className={styles.controls}
            type="text"
            value={input.summary}
            name="summary"
            onChange={(evt) => handleChange(evt)}
          />
        </div>
        <div>
          <label>Score</label>
          <input
            className={styles.controls}
            type="number"
            value={input.score}
            name="score"
            onChange={(evt) => handleNumber(evt)}
          />
        </div>
        <div>
          <label>Heath score</label>
          <input
            className={styles.controls}
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(evt) => handleNumber(evt)}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            className={styles.controls}
            type="text"
            value={input.image}
            name="image"
            onChange={(evt) => handleChange(evt)}
          />
        </div>
        <div>
          <label>Steps</label>
          <input
            className={styles.controls}
            type="text"
            value={input.steps}
            name="steps"
            onChange={(evt) => handleChange(evt)}
          />
        </div>
        <div>
          <select
            className={styles.select}
            defaultValue="Diets"
            onChange={(evt) => handleSelect(evt)}
          >
            <option disabled>Diets</option>
            {type?.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        {input.name !== "" && !errors.name ? (
          <div>
            <button className={styles.btnNeon} type="submit">
              Recipes Create
            </button>
          </div>
        ) : (
          <p className={styles.error}>Name is require or duplicate input</p>
        )}
      </form>
      <div className={styles.typ}>
        {input.diets.map((el, index) => (
          <div className="ty" key={index}>
            <p>{el}</p>
            <button className="but" onClick={() => handleDelete(el)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
