import { useEffect } from "react";
import { IMG_URL } from "../../app/constants";
import styles from "../../styles/modal.module.scss";

export default function Modal({ casts, toggleModal }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className={styles.container}>
      <button onClick={toggleModal}>X</button>
      <div className={styles.castBox}>
        <div className={styles.casts}>
          {casts.map((cast, idx) => {
            const { profile_path, name, character } = cast;
            return (
              <div key={idx} className={styles.card}>
                {profile_path ? (
                  <img src={`${IMG_URL}${profile_path}`} alt='' />
                ) : (
                  <div className={styles.noImage}>no image</div>
                )}
                <div className={styles.characterName}>{character}</div>
                <div className={styles.name}>{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
