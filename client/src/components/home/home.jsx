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
import "./Home.css";
import Pagination from "../pagination/Pagination.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const recipesAll = useSelector((state) => state.recipes);
  const second = useSelector((state) => state.recipesAll);
  const typesAll = useSelector((state) => state.types);
  if (second.length === 0) dispatch(getRecipesAll());

  useEffect(() => {
    dispatch(getTypes());
  }, []);
  const [order, setOrder] = useState("");

  const [currenPage, setCurrentPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);
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
    setOrder(`${evt.target.value}`);
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
        <SearchBar />
      </div>
      <div className="option">
        <div className="select">
          <select
            defaultValue="Filter by Order"
            onChange={(evt) => handleFilterByOrder(evt)}
          >
            <option disabled>Filter by Order</option>
            <option key="up" value="up">
              Upward
            </option>
            <option key="down" value="down">
              Descendant
            </option>
          </select>
        </div>
        <div className="select">
          <select
            defaultValue="Filter by Source"
            onChange={(evt) => handleFilterBySource(evt)}
          >
            <option disabled>Filter by Source</option>
            <option key="crtd" value="created">
              Created by user
            </option>
            <option key="aobtn" value="apiobtn">
              API
            </option>
          </select>
        </div>
        <div className="select">
          <select
            defaultValue="Filter by type"
            onChange={(evt) => handleFilterByDiets(evt)}
          >
            <option disabled>Filter by type</option>
            {typesAll?.map((type) => (
              <option key={type.title} value={type.title}>
                {type.title}
              </option>
            ))}
          </select>
        </div>
        <div className="select">
          <select
            defaultValue="Order by score"
            onChange={(evt) => handleOrderByScore(evt)}
          >
            <option disabled>Order by score</option>
            <option key="SSc" value="SSc"></option>
            <option key="HSc" value="HSc">
              health Score
            </option>
          </select>
        </div>
        <div className="resetDefault">
          <button className="btn-neon" onClick={(e) => handleDefault(e)}>
            Reset Default
          </button>
          <span id="span1"></span>
          <span id="span2"></span>
          <span id="span3"></span>
          <span id="span4"></span>
        </div>
        <div className="link">
          <Link to="/recipes">
            <button className="btn-neon"> New Recipe</button>
          </Link>
          <span id="span1"></span>
          <span id="span2"></span>
          <span id="span3"></span>
          <span id="span4"></span>
        </div>
      </div>
      <div className="pag-body">
        {recipesAll.length > 0 ? (
          <div className="body">
            {currentRecipes?.map((recipe, index) => {
              return (
                <div className="cards" key={index}>
                  <Card
                    key={recipe.id}
                    id={recipe.idApi ? recipe.idApi : recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    // types={recipe.types}
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

      <div className="pagination">
        <Pagination
          recipesPage={recipesPage}
          recipesAll={recipesAll.length}
          Page={Page}
        />
      </div>
    </div>
  );
}
