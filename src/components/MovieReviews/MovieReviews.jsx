import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiComponent } from "../../axios";
import Loader from "../Loader";
import Error from "../Error";
import css from "./MovieReviews.module.css";
import { formatDate, formatText } from "../../helpers";

export default function MovieReviews({ imgPath }) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const noAvatar = new URL("../../assets/images/no_avatar.jpg", import.meta.url)
    .href;
  useEffect(() => {
    async function fetchCredits() {
      const api = new ApiComponent();
      try {
        setLoading(true);
        setError(false);
        const reviews = await api.fetchDetails(movieId, "/reviews");
        setReviews(reviews.results);
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
      <h2>Reviews</h2>
      <ul className={css["review-container"]}>
        {!error &&
          reviews.map((review) => {
            const {
              created_at,
              updated_at,
              id,
              author_details,
              author,
              content,
            } = review;
            const avatarSrc = author_details.avatar_path
              ? `${imgPath}${author_details.avatar_path}`
              : noAvatar;
            return (
              <li className={css["review-item"]} key={id}>
                <div className={css["avatar-name-container"]}>
                  <img className={css.avatar} src={avatarSrc} alt="" />
                  <div>
                    <p className={css["review-author"]}>{author}</p>
                    <p className={css["review-author-username"]}>
                      @{author_details.username}
                    </p>
                  </div>
                </div>
                <div className={css["review"]}>
                  <div
                    dangerouslySetInnerHTML={{ __html: formatText(content) }}
                  />

                  <p className={css["review-created-at"]}>
                    {formatDate(created_at)}
                  </p>
                </div>
                <p className={css["edited"]}>
                  {updated_at !== null ? "edited!" : ""}
                </p>
              </li>
            );
          })}
      </ul>
      {reviews.length===0 && (<>No reviews yet..</>)}
      {loading && <Loader />}
      {error && <Error />}
    </>
  );
}
