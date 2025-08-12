import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <button onClick={onClick}>
      LoadMore
    </button>

  );
}
