import React from "react";
import Image from "next/image";
import styles from "./movie-info.module.scss";
export default function PosterImage({ title, name, poster_path, res }) {
  return (
    <>
      {poster_path ? (
        <Image
          className={styles.poster}
          src={poster_path}
          alt={title || name}
          priority={true}
          width={res.width}
          height={res.height}
          sizes='500px'
          placeholder='blur'
          blurDataURL={res.base64}
        />
      ) : (
        <div className={styles.noImage}>no image</div>
      )}
    </>
  );
}
