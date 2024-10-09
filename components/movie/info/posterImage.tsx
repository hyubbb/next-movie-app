"use server";
import React from "react";
import Image from "next/image";
import styles from "./movie-info.module.scss";
import getBase64 from "@/utils/getBase64";

export default async function PosterImage({ title, name, poster_path }) {
  let posterImageData;

  if (poster_path) {
    posterImageData = await getBase64(`${poster_path}`);
  }
  return (
    <>
      {poster_path ? (
        <Image
          className={styles.poster}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f3f3f321",
          }}
          src={poster_path}
          alt={title || name}
          priority={true}
          placeholder='blur'
          width={posterImageData?.width}
          height={posterImageData?.height}
          blurDataURL={posterImageData?.base64}
        />
      ) : (
        <div className={styles.noImage}>no image</div>
      )}
    </>
  );
}
