import React from "react";
import Image from "next/image";
import styles from "./movie-info.module.scss";
export default function PosterImage({ title, name, poster_path, blurredBg }) {
  return (
    <>
      {poster_path ? (
        <Image
          className={styles.poster}
          src={poster_path}
          alt={title || name}
          priority={true}
          sizes='1500px'
          placeholder='blur'
          width={blurredBg.width}
          height={blurredBg.height}
          blurDataURL={blurredBg.base64}
        />
      ) : (
        <div className={styles.noImage}>no image</div>
      )}
    </>
  );
}
