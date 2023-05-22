const { Router } = require("express");
const { Diets } = require("../db");
const { getTypesDiets } = require("../controllers/Diet");
const router = Router();

// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar
// la base de datos con los tipos de datos indicados por spoonacular.
router.get("/", async (req, res) => {
  try {
    //   types.forEach(async (n) => {
    //     await Diets.findOrCreate({
    //       where: {
    //         name: n,
    //       },
    //     });
    //   });

    const typeDie = await getTypesDiets();
    res.status(200).json(typeDie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
