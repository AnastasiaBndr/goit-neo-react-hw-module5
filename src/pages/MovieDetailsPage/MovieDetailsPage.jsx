import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { ApiComponent } from "../../axios";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage({ imgPath }) {
  const { movieId } = useParams();
  const [details, setDetails] = useState();
  const [videos, setVideos] = useState();
  useEffect(() => {
    const api = new ApiComponent();
    async function fetchData() {
      try {
        const details = await api.fetchDetails(movieId);
        const videos = await api.fetchDetails(movieId, "/videos");
        setDetails(details);
        setVideos(videos.results.filter((video) => video.type == "Trailer"));
      } catch (err) {
        console.log(err);
      } finally {
        console.log("Fine!");
      }
    }
    fetchData();
  }, [movieId]);
  return (
    details && (
      <div>
        <div>
          <img
            src={`${imgPath}${details.poster_path}`}
            alt={details.name ?? details.title}
          />
          <ul>
            {videos.map((video) => {
              return (
                <li key={video.id}>
                  <iframe
                    width="420"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}
                  ></iframe>
                </li>
              );
            })}
          </ul>
        </div>

        <p>{details.overview}</p>
        <div>
          <p>Production companies</p>
          <ul>
            {details.production_companies.map((company) => {
              return (
                <li key={company.id}>
                  <img
                    src={`${imgPath}${company.logo_path}`}
                    alt={company.name}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p>Production countries</p>
          <ul>
            {details.production_countries.map((country) => {
              return <li key={country.iso_3166_1}>{country.name}</li>;
            })}
          </ul>
        </div>
        <p>{details.tagline}</p>
        <p>Release date: {details.release_date}</p>
        <NavLink className={buildLinkClass} to={"cast"}>
          Cast
        </NavLink>
        <NavLink className={buildLinkClass} to={"reviews"}>
          Reviews
        </NavLink>
        <Outlet />
      </div>
    )
  );
}
