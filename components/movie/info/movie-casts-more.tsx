"use client";
import React, { useState } from "react";
import styles from "./movie-credits.module.scss";
import Modal from "@/components/modal/modal";
export default function MovieCastsMore({ casts }) {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal && <Modal casts={casts} toggleModal={toggleModal} />}
      <div className={styles.title}>
        <div>Cast</div>
        {casts.length > 6 && (
          <div className={styles.sub} onClick={toggleModal}>
            더 보기
          </div>
        )}
      </div>
    </>
  );
}
