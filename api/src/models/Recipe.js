const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
      },
      health_score: {
        type: DataTypes.FLOAT,
        validate: { min: 0, max: 100 },
      },
      instructions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
