/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipesAll,
  getTypes,
  getFilterByDiets,
  setDefaultCards,
  filterByResources,
  filterByOrder,
  orderByScore,
} from "../../redux/action";
import { Link } from "react-router-dom";
import { Card } from "../card/Card";
import { SearchBar } from "../searchBar/SearchBar.jsx";
import styles from "./Home.module.css";
import Pagination from "../pagination/Pagination.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const recipesAll = useSelector((state) => state.recipes);
  const second = useSelector((state) => state.recipesAll);
  const typesAll = useSelector((state) => state.types);
  if (second.length === 0) dispatch(getRecipesAll());

  useEffect(() => {
    dispatch(getTypes());
  }, [getTypes]);
  const [order, setOrder] = useState("");

  const [currenPage, setCurrentPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);
  const [RecipesAll, setRecipesAll] = useState([]);
  const indexLastRecipe = currenPage * recipesPage;
  const indexFirstRecipe = indexLastRecipe - recipesPage;
  const currentRecipes = recipesAll.length
    ? recipesAll.slice(indexFirstRecipe, indexLastRecipe)
    : [];

  // console.log(recipesAll, "error");

  const Page = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleDefault(e) {
    console.log("default");
    dispatch(setDefaultCards());
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  function handleFilterByDiets(evt) {
    dispatch(getFilterByDiets(evt.target.value));
    setCurrentPage(1);
    setOrder(`${evt.target.value}`);
  }

  function handleFilterBySource(evt) {
    dispatch(filterByResources(evt.target.value));
    setCurrentPage(1);
    // setOrder(`${evt.target.value}`);
    // setRecipesAll(
    //   recipesAll.filter((recipe) => recipe.source === evt.target.value)
    // );
  }

  function handleFilterByOrder(evt) {
    evt.preventDefault();
    dispatch(filterByOrder(evt.target.value));
    setCurrentPage(1);
    setOrder(`${evt.target.value}`);
  }

  function handleOrderByScore(evt) {
    evt.preventDefault();
    dispatch(orderByScore(evt.target.value));
    setCurrentPage(1);
    setOrder(`${evt.target.value}`);
  }

  return (
    <div>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div className={styles.option}>
        <div className={styles.select}>
          <select
            defaultValue="Filter by Order"
            onChange={(evt) => handleFilterByOrder(evt)}
            setCurrentPage={setCurrentPage}
          >
            <option disabled>Filter by Order</option>
            <option key="up" value="up">
              A-Z
            </option>
            <option key="down" value="down">
              Z-A
            </option>
          </select>
        </div>

        <div className={styles.select}>
          <select
            defaultValue="Filter by Source"
            onChange={(e) => handleFilterBySource(e)}
            setCurrentPage={setCurrentPage}
          >
            <option disabled>Filter by Source</option>
            <option value="string">Created by user</option>
            <option value="api">API</option>
          </select>
        </div>
        <div className={styles.select}>
          <select
            defaultValue={"all"}
            name="diets"
            onChange={(evt) => handleFilterByDiets(evt)}
            setCurrentPage={setCurrentPage}
          >
            <option value="all">Filter by type of diet</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lacto vegetarian">Lacto Vegetarian</option>
            <option value="ovo vegetarian">Ovo Vegetarian</option>
            <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="fodmap friendly">Fodmap Friendly</option>
            <option value="whole 30">Whole30</option>
            <option value="dairy free">Dairy Free</option>
          </select>
        </div>
        <div className={styles.select}>
          <select
            defaultValue="Order by score"
            onChange={(evt) => handleOrderByScore(evt)}
            setCurrentPage={setCurrentPage}
          >
            <option disabled>Order by score</option>
            <option key="SSc" value="SSc"></option>
            <option key="HSc" value="HSc">
              health Score
            </option>
          </select>
        </div>
        <div className={styles.resetDefault}>
          <button className={styles.btnNeon} onClick={(e) => handleDefault(e)}>
            Reset Default
          </button>
          <span id="span1"></span>
          <span id="span2"></span>
          <span id="span3"></span>
          <span id="span4"></span>
        </div>
        <div className={styles.link}>
          <Link to="/recipes">
            <button className={styles.btnNeon}> New Recipe</button>
          </Link>
          <span id="span1"></span>
          <span id="span2"></span>
          <span id="span3"></span>
          <span id="span4"></span>
        </div>
      </div>

      <div className={styles.pagBody}>
        {recipesAll.length > 0 ? (
          <div className={styles.containerAll}>
            {currentRecipes.map((recipe, index) => {
              return (
                <div className={styles.cards} key={index}>
                  <Card
                    key={recipe.id}
                    id={recipe.idApi ? recipe.idApi : recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    diets={recipe.diets}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <img src="../../assets/404-error.jpg"></img>
        )}
      </div>

      <div className={styles.pagination}>
        <Pagination
          recipesPage={recipesPage}
          recipesAll={recipesAll.length}
          Page={Page}
        />
      </div>
    </div>
  );
}
