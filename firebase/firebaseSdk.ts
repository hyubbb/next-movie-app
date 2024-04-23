import * as admin from "firebase-admin";

const firebaseAdminConfig = {
  private_key: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n"
  ),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  project_id: process.env.FIREBASE_PROJECT_ID,
};

// Firebase Admin 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: "https://next-movie-b3eec.firebaseio.com",
  });
}

// ID 토큰 검증 함수
const verifyIdToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};

export { verifyIdToken };
