const { Router } = require("express");
const { Diets } = require("../db");
// const { types } = require("./controllers/Diet");
const router = Router();

// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar
// la base de datos con los tipos de datos indicados por spoonacular.
router.get("/", async (req, res, next) => {
  try {
    types.forEach(async (n) => {
      await Diets.findOrCreate({
        where: {
          name: n,
        },
      });
    });
    const diets = await Diets.findAll();
    res.send(diets);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
