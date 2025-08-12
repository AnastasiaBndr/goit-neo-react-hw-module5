import css from "./MovieList.module.css";
import MovieCard from "../MovieCard";

export default function MovieList({ imgPath,movies, onClick }) {
  return (
    <ul className={css["gallery-container"]}>
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <MovieCard
              onClick={onClick}
              src={`${imgPath}${movie.poster_path || movie.poster}`}
              alt={movie.title}
              name={movie.title || movie.name}
              id={movie.id}
            />
          </li>
        );
      })}
    </ul>
  );
}
