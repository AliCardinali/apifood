import axios from "axios";

const url = "http://localhost:3001";

export const GET_FOOD = "GET_FOOD";

export function getFood() {
  return function (dispatch) {
    //Conexión entre FRONT Y BACK
    return axios
      .get(`${url}/recipes`)
      .then((response) => {
        dispatch({
          type: "GET_FOOD",
          payload: response.data,
        });
      })
      .catch((error) => {
        // Manejar el error en caso de que la solicitud falle
        console.error("Error:", error);
      });
  };
}
