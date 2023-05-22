import React from "react";
import { useDispatch } from "react-redux";
import { searchId } from "../../redux/action";
import { useHistory } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ id, title, image, diets }) {
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleId(id) {
    await dispatch(searchId(id));
    history.push("/detail");
  }

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        <div className={styles.image}>
          <img src={image} alt="image not Found" width="150px" height="100px" />
        </div>
        <div className={styles.foot}>
          <div className={styles.diets}>
            <h4>Diets Types</h4>
            {diets?.map((diet, index) => (
              <p key={index}>{diet}</p>
            ))}
          </div>
        </div>
        <div className={styles.buton}>
          <button className={styles.neonutton} onClick={() => handleId(id)}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export { Card };
