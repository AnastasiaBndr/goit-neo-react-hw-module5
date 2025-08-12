import css from "./MovieList.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function MovieList({ imgPath, movies }) {
  const location = useLocation();
  return (
    <ul className={css["gallery-container"]}>
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <div className={css["image-container"]}>
                <img
                  className={css.image}
                  src={`${imgPath}${movie.poster_path || movie.poster}`}
                  alt={movie.title}
                />
                <p>{movie.title || movie.name}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
