import { useEffect, useState } from "react";
import { ApiComponent } from "../../axios";
import MovieList from "../../components/MovieList";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import css from "./HomePage.module.css"

export default function HomePage({ imgPath }) {
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
        const totalHits = data.total_pages;
        const totalPages = Math.ceil(totalHits / api.getLimit());

        setTrending((prev) => {
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
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className={css["gallery-loadmore"]}>
        {trending.length > 0 && (
          <MovieList movies={trending} imgPath={imgPath} />
        )}
        {loadMore && <LoadMoreBtn onClick={handleLoadMore} />}
      </div>

      {loading && <Loader />}
      {error && <Error />}
    </>
  );
}
