import css from "./ImageCard.module.css";

export default function ImageCard({ src, alt,id, onClick }) {
  return (
    <div className={css["image-container"]} onClick={onClick}>
      <img className={css.image} id={id} src={src} alt={alt} />
     
    </div>
  );
}
