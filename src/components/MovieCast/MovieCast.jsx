import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiComponent } from "../../axios";
import Loader from "../Loader";
import Error from "../Error";
import css from "./MovieCast.module.css";

export default function MovieCast({ imgPath }) {
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchCredits() {
      setLoading(true);
      setError(false);
      const api = new ApiComponent();
      try {
        const credits = await api.fetchDetails(movieId, "/credits");
        setCredits(credits.cast.filter((credit) => credit.profile_path));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCredits();
  }, [movieId]);

  return (
    <>
      <h2>Cast</h2>
      <ul className={css["cast-container"]}>
        {credits.length > 0 &&
          credits
            .filter((credit) => credit.profile_path)
            .map((credit) => {
              return (
                <li key={credit.id} className={css["image-container"]}>
                  <img
                    className={css["image"]}
                    src={`${imgPath}${credit.profile_path}`}
                    alt=""
                  />
                  <p className={css.name}>"{credit.character}"</p>
                  <p className={css.name}>{credit.name}</p>
                </li>
              );
            })}
      </ul>
      {credits.length === 0 && <>No info..</>}
      {loading && <Loader />}

      {error && <Error />}
    </>
  );
}
