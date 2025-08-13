import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, NavLink, useLocation } from "react-router-dom";
import { ApiComponent } from "../../axios";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage({ imgPath }) {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState();

  const location = useLocation();

  useEffect(() => {
    const api = new ApiComponent();
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const details = await api.fetchDetails(movieId);
        setDetails(details);
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
      {details && (
        <div className={css.container}>
          <div className={css["image-description-container"]}>
            <div>
              <img
                className={css.poster}
                src={`${imgPath}${details.poster_path}`}
                alt={details.name ?? details.title}
              />
              <div className={css["nav-links"]}>
                <NavLink
                  className={buildLinkClass}
                  to={"cast"}
                  state={{ from: location }}
                >
                  Cast
                </NavLink>
                <NavLink
                  className={buildLinkClass}
                  to={"reviews"}
                  state={{ from: location }}
                >
                  Reviews
                </NavLink>
                <NavLink
                  className={buildLinkClass}
                  to={"trailer"}
                  state={{ from: location }}
                >
                  Trailer
                </NavLink>
              </div>
            </div>

            <div className={css.descriptions}>
              <div className={css["description-vote"]}>
                <h2 className={css.name}>{details.name ?? details.title}</h2>
                <div
                  className={clsx(
                    css["vote-average"],
                    details.vote_average >= 8
                      ? css["vote-perfect"]
                      : details.vote_average >= 6
                        ? css["vote-good"]
                        : css["vote-bad"]
                  )}
                >
                  {details.vote_average}
                </div>
              </div>

              <div className={css["tagline-container"]}>
                <FaQuoteLeft size="12px" className={css["quote-icon"]} />
                <p className={css.tagline}> {details.tagline}</p>
                <FaQuoteRight size="12px" className={css["quote-icon"]} />
              </div>

              <ul className={css["genres-container"]}>
                {details.genres?.map((genre) => {
                  return (
                    <li key={genre.id} className={css["genre-item"]}>
                      {genre.name}
                    </li>
                  );
                })}
              </ul>

              <p className={css.description}>{details.overview}</p>

              <ul className={css["countries-list"]}>
                {details.production_countries.map((country) => {
                  return (
                    <li className={css["genre-item"]} key={country.iso_3166_1}>
                      {country.name}
                    </li>
                  );
                })}
              </ul>

              <p className={css["genre-item"]}>
                Release date: {details.release_date}
              </p>
              <div className={css["backdrop-wrapper"]}>
                <img
                  className={css.backdrop}
                  src={`${imgPath}${details.backdrop_path}`}
                  alt={details.name ?? details.title}
                />
              </div>
            </div>
          </div>

          <Outlet />
        </div>
      )}
      {loading && <Loader />}
      {error && <Error />}
    </>
  );
}
