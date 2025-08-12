import css from "./MovieCard.module.css";
import { Link } from "react-router-dom";

export default function MovieCard({ id, alt, src, name }) {
  return (
    <Link to={`movies/${id}`}>
      <div className={css["image-container"]}>
        <img className={css.image} src={src} alt={alt} />
        <p>{name}</p>
      </div>
    </Link>
  );
}
