import axios from "axios";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const GET_RECIPES_ID = "GET_RECIPES_ID";
export const GET_TYPES = "GET_TYPES";
export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const SET_DEFAULT_CARD = "SET_DEFAULT_CARD";
export const FILTER_BY_RESOURCES = "FILTER_BY_RESOURCES";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const FILTER_BY_SEARCHBAR = "FILTER_BY_SEARCHBAR";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const POST_RECIPES = "POST_RECIPES";
export const GET_DATABASE = "GET_DATABASE";
export const GET_STATE_ID = "GET_STATE_ID";
const URL = "http://localhost:3001";
export function getRecipesAll() {
  return function (dispatch) {
    axios
      .get(`${URL}/recipes`)
      .then((json) => {
        return dispatch({
          type: GET_RECIPES,
          payload: json.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      const recipes = await axios.get(`${URL}/recipes?name=${name}`);
      console.log(recipes.data);
      return dispatch({
        type: GET_RECIPES_NAME,
        payload: recipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postRecipes(info) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}/recipes`, info);
      console.log(response);
      return dispatch({
        type: POST_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getRecipesId(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/recipes/${id}`);
      console.log(response);
      return dispatch({
        type: GET_RECIPES_ID,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getTypes() {
  return function (dispatch) {
    try {
      axios.get(`${URL}/diets`).then((types) =>
        dispatch({
          type: GET_TYPES,
          payload: types.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDatabase() {
  return async function (dispatch) {
    try {
      let dataBase = await axios.get(`${URL}/recipes/dates`);
      return dispatch({
        type: GET_DATABASE,
        payload: dataBase.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getFilterByDiets(payload) {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}

export function setDefaultCards() {
  return {
    type: SET_DEFAULT_CARD,
  };
}

export function filterByResources(payload) {
  return {
    type: FILTER_BY_RESOURCES,
    payload: payload,
  };
}

export function filterByOrder(payload) {
  return {
    type: FILTER_BY_ORDER,
    payload: payload,
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload: payload,
  };
}

export function searchBarName(payload) {
  return {
    type: FILTER_BY_SEARCHBAR,
    payload: payload,
  };
}

export function searchId(payload) {
  return {
    type: GET_STATE_ID,
    payload: payload,
  };
}
