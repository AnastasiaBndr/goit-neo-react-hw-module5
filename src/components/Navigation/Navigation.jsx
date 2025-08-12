import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation({goBack}) {
  return (
    <>
      <div className={css.container}>
        <button onClick={goBack}>Go back</button>
        <div className={css["navigation-container"]}>
        <NavLink to={"/"} className={buildLinkClass}>Home</NavLink>
        <NavLink to={"/movies"} className={buildLinkClass}>Movies</NavLink>
      </div>
      </div>
      
    </>
  );
}