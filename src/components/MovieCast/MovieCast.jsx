import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiComponent } from "../../axios";
import Loader from "../Loader";
import Error from "../Error";

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
      <ul>
        {credits.length > 0 &&
          credits.map((credit) => {
            return (
              <li>
                <img src={`${imgPath}${credit.profile_path}`} alt="" />
                <p>{credit.name}</p>
              </li>
            );
          })}
      </ul>
      {loading && <Loader />}
      {error && <Error />}
    </>
  );
}
