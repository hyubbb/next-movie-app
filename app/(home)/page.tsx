export const metadata = {
  title: "Home",
};

const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

const getMovies = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div>
      {movies.map((movie) => {
        const { original_title } = movie;
        return <div>{original_title}</div>;
      })}
    </div>
  );
}
