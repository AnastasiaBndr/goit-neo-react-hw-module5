import css from "./SearchBar.module.css";


export default function SearchBar({onSubmit}) {
  return (
    <header>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" >Search</button>
      </form>
    </header>



  );
}
