const axios = require("axios");
const { Diets, Recipe } = require("../db");
// const { API_KEY, URL_SPOONACULAR } = process.env;
require("dotenv").config();
const { DB_URL } = process.env;

const get_Api = async () => {
  // const response = await axios.get(
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  // );
  const response = await axios.get(DB_URL);
  const infoApi = response.data.results.map((r) => {
    return {
      id: r.id,
      title: r.title,
      image: r.image,
      summary: r.summary,
      healthScore: r.healthScore,
      steps: r.analyzedInstructions[0]?.steps.map((s) => {
        return {
          number: s.number,
          step: s.step,
        };
      }),
      diets: r.diets,
      dish: r.dishTypes,
    };
  });

  return infoApi;
};
const get_DataBase = async () => {
  const data = await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const result = data.map((el) => {
    const dietas = el.Diets.map((elm) => elm.name);
    console.log(dietas);
    return {
      id: el.id,
      title: el.title,
      summary: el.summary,
      healthScore: el.healthScore,
      image: el.image,
      steps: el.steps,
      diets: dietas,
    };
  });

  // console.log(data, "esto es la base de datos");
  return result;
};

const get_ApiID = async (id) => {
  // const apiId = await axios.get(
  //   `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  // );
  const apiId = await axios.get(DB_URL);
  const detail = apiId.data.results.find((el) => el.id === Number(id));

  const { title, summary, healthScore, image, analyzedInstructions, diets } =
    detail;

  let recipeDetail = {
    id,
    title,
    summary,
    healthScore,
    image,
    steps:
      analyzedInstructions.length > 0 &&
      analyzedInstructions[0].steps.map((s) => s.step),
    diets,
  };

  return recipeDetail;
};

const get_DataBaseID = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const get_AllRecipes = async () => {
  const [apiRecipes, databaseRecipes] = await Promise.all([
    get_Api(),
    get_DataBase(),
  ]);
  return [...apiRecipes, ...databaseRecipes];
};

module.exports = {
  get_AllRecipes,
  get_DataBase,
  get_Api,
  get_DataBaseID,
  get_ApiID,
};
