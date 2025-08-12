import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard";

export default function ImageGallery({ photos, onClick }) {
  return (
    <ul className={css["gallery-container"]}>
      {photos.map((photo) => {
        return (
          <li key={photo.id}>
            <ImageCard
              srcset={photo.urls.regular}
              onClick={onClick}
              src={photo.urls.small}
              id={photo.id}
            />
          </li>
        );
      })}
    </ul>
  );
}
