import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, NavLink, useLocation } from "react-router-dom";
import { ApiComponent } from "../../axios";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

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

  console.log(details);
  return (
    <>
      {details && (
        <div className={css.container}>
          <div className={css["image-description-container"]}>
            <img
              className={css.poster}
              src={`${imgPath}${details.poster_path}`}
              alt={details.name ?? details.title}
            />

            <div className={css.descriptions}>
              <h2 className={css.name}>{details.name ?? details.title}</h2>

              <p className={css.tagline}>{details.tagline}</p>
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
              <div>
                <p>Countries:</p>
                <ul>
                  {details.production_countries.map((country) => {
                    return <li key={country.iso_3166_1}>{country.name}</li>;
                  })}
                </ul>
              </div>

              <p>Release date: {details.release_date}</p>
            </div>
          </div>

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
          <Outlet />
        </div>
      )}
      {loading && <Loader />}
      {error && <Error />}
    </>
  );
}
