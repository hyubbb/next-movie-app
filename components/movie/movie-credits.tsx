"use client";

import React, { useState } from "react";
import { IMG_URL } from "../../app/constants";
import styles from "../../styles/movie-credits.module.scss";
import Modal from "../modal/modal";

const MovieCredits = ({ id, credits }) => {
  const { cast: casts } = credits;
  const castCnt = casts.length > 6 ? 6 : casts.length;
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal && <Modal casts={casts} toggleModal={toggleModal} />}
      <div className={styles.container}>
        <div className={styles.title}>
          <div>Cast</div>
          {casts.length > 6 && (
            <div className={styles.sub} onClick={toggleModal}>
              더 보기
            </div>
          )}
        </div>
        {casts.slice(0, castCnt).map((cast, idx) => {
          const { profile_path, name, character } = cast;
          return (
            <div key={idx} className={styles.credit}>
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
    </>
  );
};

export default MovieCredits;
