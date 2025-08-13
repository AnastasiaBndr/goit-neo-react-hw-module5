import css from "./SearchBar.module.css";


export default function SearchBar({onSubmit}) {
  return (
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="search"
        />
        <button type="submit" >Search</button>
      </form>

  );
}
