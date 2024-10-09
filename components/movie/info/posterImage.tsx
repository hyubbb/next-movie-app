"use server";
import React from "react";
import Image from "next/image";
import styles from "./movie-info.module.scss";
import getBase64 from "@/utils/getBase64";
import { IMG_URL } from "@/app/constants";
export default async function PosterImage({ title, name, poster_path }) {
  let posterImageData;
  if (poster_path) {
    posterImageData = await getBase64(`${IMG_URL}${poster_path}`);
  }
  return (
    <>
      {poster_path ? (
        <Image
          className={styles.poster}
          src={poster_path}
          alt={title || name}
          priority={true}
          // width={1000}
          // height={1000}
          placeholder='blur'
          width={posterImageData?.width}
          height={posterImageData?.height}
          blurDataURL={
            posterImageData?.base64 ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
          }
        />
      ) : (
        <div className={styles.noImage}>no image</div>
      )}
    </>
  );
}
