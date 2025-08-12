import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiComponent } from "../../axios";

export default function MovieCast({ imgPath }) {
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    async function fetchCredits() {
      const api = new ApiComponent();
      try {
        const credits = await api.fetchDetails(movieId, "/credits");
        setCredits(credits.cast.filter((credit) => credit.profile_path));
      } catch (err) {
        console.log(err);
      } finally {
        console.log("Fine!");
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
    </>
  );
}
