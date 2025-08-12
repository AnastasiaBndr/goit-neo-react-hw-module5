import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiComponent } from "../../axios";
import css from "./MovieReviews.module.css";

export default function MovieReviews({ imgPath }) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const noAvatar = new URL("../../assets/images/no_avatar.jpg", import.meta.url)
    .href;
  console.log(noAvatar)
  useEffect(() => {
    async function fetchCredits() {
      const api = new ApiComponent();
      try {
        const reviews = await api.fetchDetails(movieId, "/reviews");
        setReviews(reviews.results);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("Fine!");
      }
    }
    fetchCredits();
  }, [movieId]);

  console.log(reviews);
  return (
    <>
      <ul>
        {reviews.length > 0 &&
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
              <li key={id}>
                <div>
                  <img
                    className={css.avatar}
                    src={avatarSrc}
                    alt=""
                  />
                </div>

                <p>{author}</p>
                <p>@{author_details.username}</p>

                <p>{content}</p>
                <p>
                  {created_at} {updated_at !== null ? "edited!" : ""}
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
}
