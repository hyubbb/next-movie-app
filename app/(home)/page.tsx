import Link from "next/link";

export const metadata = {
  title: "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

const getMovies = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div>
      {movies.map((movie) => {
        const { original_title, id } = movie;
        return (
          <li key={id}>
            <Link href={`/movies/${id}`}>{original_title}</Link>
          </li>
        );
      })}
    </div>
  );
}
