const movieDetail = ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: string;
}) => {
  return <h1>movie detail {id}</h1>;
};

export default movieDetail;
