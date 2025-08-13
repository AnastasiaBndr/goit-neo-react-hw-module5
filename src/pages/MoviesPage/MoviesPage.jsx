import { useEffect, useState } from "react";
import { ApiComponent } from "../../axios";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import MovieList from "../../components/MovieList";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";

export default function MoviesPage({ imgPath }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchData() {
      const api = new ApiComponent();
      try {
        setLoading(true);
        setError(false);
        setLoadMore(false);

        if (page === 1) {
          setMovies([]);
        }

        const data = await api.fetchByName(query, page);

        const totalHits = data.total_results;
        const totalPages = Math.ceil(totalHits / api.getLimit());

        setMovies((prev) => {
          if (page === 1) return data.results;
          return [...prev, ...data.results];
        });
        setLoadMore(page < totalPages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, query]);
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className={css["gallery-loadmore"]}>
        {movies.length > 0 && <MovieList movies={movies} imgPath={imgPath} />}
        {loadMore && <LoadMoreBtn onClick={handleLoadMore} />}
      </div>

      {loading && <Loader />}
      {error && <Error />}
    </>
  );
}
