let regexName = /^[a-zA-Z\s]+$/;

export const validate = (input) => {
  let errors = {};

  // Name obligatorio.
  if (!input.title) {
    errors.title = "Name cannot be null.";
  }
  // Solo letras
  if (!regexName.test(input.title)) {
    errors.title = "Name invalid.";
  }
  // Summary obligatorio.
  if (!input.summary) {
    errors.summary = "Summary cannot be null.";
  }
  // El score tiene que ser de 1 a 100, puede ser nulo.
  if (input.score < 1 || input.score > 100) {
    errors.score = "The score is 1 - 100.";
  }
  // El healthScore tiene que ser de 1 a 100, puede ser nulo.
  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "The health score is 1 - 100.";
  }

  // Obligatorio los pasos.
  if (!input.steps) {
    errors.steps = "Enter the recipe steps.";
  }

  return errors;
};
