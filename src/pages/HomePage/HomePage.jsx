import { useEffect, useState } from "react";
import { ApiComponent } from "../../axios";
import MovieList from "../../components/MovieList";

export default function HomePage({imgPath}) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);


  useEffect(() => {
    async function fetchData() {
      const api = new ApiComponent();
      try {
        setLoading(true);
        setError(false);
        setLoadMore(false);

        if (page === 1) {
          setTrending([]);
        }

        const data = await api.fetchTrending(page);
        const totalHits = data.total;
        const totalPages = Math.ceil(totalHits / api.limit);

        setTrending((prev) => {
          if (page === 1) return data.results;
          return [...prev, data.results];
        });

        setLoadMore(page < totalPages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return (
    <>
      <MovieList movies={trending} imgPath={imgPath} />
    </>
  );
}
