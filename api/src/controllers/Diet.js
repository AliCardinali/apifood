const { Diets } = require("../db");
const axios = require("axios");
// const postDiet = require("../handlers/handlerPostDiet");
const { API_KEY, URL_SPOONACULAR } = process.env;

const getTypesDiets = async () => {
  /** obtener en un array todos los tipos de dietas existentes,
   * si no existe ni una dieta se debe prerecargar los datos,
   * obtenerlas de la Api y guardarlas en la base de datos
   *
   *
   *
   * FALTA GUARDARLA EN LA BASE DE DATOS
   */
  const typesDiet =
    // (
    // await axios.get(
    //   `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    // )
    // ).data.results;

    (
      await axios.get(
        `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
      )
    ).data.results;

  const die = typesDiet.map((elem) => elem.diets);
  //   const filterDiets = die.filter((item, index) => {
  //     return die.indexOf(item) === index;
  //   })
  // console.log(filterDiets);
  const eachDiets = [];
  for (let i = 0; i < die.length; i++) {
    for (let j = 0; j < die[i].length; j++) {
      eachDiets.push(die[i][j]);
    }
  }
  const allDiets = await Diets.findAll();

  const dataArr = new Set(eachDiets);

  let result = [...dataArr];

  await postDiet(result);

  return result;
};

const postDiet = async (dataArr) => {
  /** agarra la info y lo sube a la tabla de la bd */
  await dataArr.map((elem) => {
    Diets.findOrCreate({
      where: {
        name: elem,
      },
    });
  });
};
module.exports = {
  getTypesDiets,
};
