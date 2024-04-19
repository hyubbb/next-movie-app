"use client";

import React, { useState } from "react";
import { IMG_URL } from "../../constants";
import styles from "../../styles/movie-credits.module.scss";
import Modal from "../modal/modal";
import Image from "next/image";

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
      {casts.length > 0 && (
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
                  <Image
                    src={`${IMG_URL}${profile_path}`}
                    alt={name}
                    fill
                    sizes='300px'
                  />
                ) : (
                  <div className={styles.noImage}>no image</div>
                )}
                <div className={styles.characterName}>{character}</div>
                <div className={styles.name}>{name}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MovieCredits;
