const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// const recipeRouter = require("./recipeRouter");
const recipesRouter = require("./recipesRouter");
const dietRouter = require("./dietRouter");

const Diet = require("../models/Diets");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use("/recipe", recipeRouter);
router.use("/recipes", recipesRouter);
router.use("/diets", dietRouter);
module.exports = router;
