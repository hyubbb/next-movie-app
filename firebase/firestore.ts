import { db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { ILike } from "../types/type";

// 좋아요 다 불러오는 함수
export async function fetchLikesByUser(userId: string): Promise<ILike[]> {
  const likesRef = collection(db, "movie");
  const likesQuery = query(likesRef, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(likesQuery);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }
    let results: ILike[] = [];
    querySnapshot.forEach((doc) => {
      const likeData = doc.data() as ILike;
      results.push(likeData);
    });
    return results;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
}

// 영화에 맞는 좋아요 불러오는 함수
export async function fetchLikesByUserAndPost(
  userId: string,
  movieId: string
): Promise<ILike | boolean> {
  const likesRef = collection(db, "movie"); // "movie" 컬렉션 참조
  const likesQuery = query(
    likesRef,
    where("userId", "==", userId),
    where("movieId", "==", movieId)
  );

  try {
    const querySnapshot = await getDocs(likesQuery);
    if (querySnapshot.empty) {
      return false;
    }

    return querySnapshot.docs[0].data() as ILike;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return false;
  }
}

// 좋아요 토글 함수
export async function toggleLike(
  userId: string,
  movieId: string,
  type: string
): Promise<ILike[] | string> {
  const likesRef = collection(db, "movie");
  const q = query(
    likesRef,
    where("userId", "==", userId),
    where("movieId", "==", movieId)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // 좋아요 문서가 없으므로 추가
      const docRefData: ILike = {
        userId: userId,
        movieId: movieId,
        type: type,
        likedAt: new Date(),
      };
      await addDoc(likesRef, docRefData);
      return [docRefData];
    } else {
      // 좋아요 문서가 있으므로 삭제
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      return [];
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return "Error";
  }
}
