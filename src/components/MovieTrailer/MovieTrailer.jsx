import css from "./MovieTrailer.module.css";
import { useEffect, useState } from "react";
import { ApiComponent } from "../../axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import Error from "../Error";
import { DiVim } from "react-icons/di";

export default function MovieTrailer() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [video, setVideo] = useState();
  useEffect(() => {
    const api = new ApiComponent();
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const videos = await api.fetchDetails(movieId, "/videos");

        const videoFiltered = videos.results.filter(
          (video) => video.type == "Trailer" && !video.name.includes("removed")
        );
        setVideo(videoFiltered[0] || {});
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <>
      {video && (
        <li key={video.id}>
          <iframe
            className={css["video-frame"]}
            src={`https://www.youtube.com/embed/${video.key}`}
          ></iframe>
        </li>
      )}
      {!video && !loading && (
        <div className={css["no-trailer"]}>No trailer...</div>
      )}

      {loading && <Loader />}
      {error && <Error />}
    </>
  );
}
