import { getPlaiceholder } from "plaiceholder";
import { metadata } from "../pages/layout";

const getBase64 = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    base64,
  } = await getPlaiceholder(buffer, { size: 10 });
  return {
    base64,
    height,
    width,
  };
};

export default getBase64;
