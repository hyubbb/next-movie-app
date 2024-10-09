import { getPlaiceholder } from "plaiceholder";

const getBase64 = async (src: string) => {
  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(
      `이미지를 불러오는 데 실패했습니다: ${response.statusText}`
    );
  }

  // 이미지 데이터를 ArrayBuffer로 변환
  const buffer = await response.arrayBuffer();

  // ArrayBuffer를 Buffer로 변환 (Node.js 환경)
  const imageBuffer = Buffer.from(buffer);

  const {
    metadata: { height, width },
    base64,
  } = await getPlaiceholder(imageBuffer, { size: 10 });
  return {
    base64,
    height,
    width,
  };
};

export default getBase64;
