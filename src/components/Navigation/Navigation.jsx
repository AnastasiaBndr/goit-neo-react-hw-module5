import { NavLink, Link } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkLocationRef = useRef(location.state?.from ?? "/");
  const onSubmit = (e) => {
    e.preventDefault();

    const inputValue = e.target[0].value.trim();
    if (!inputValue) {
      toast.error("Write something!");
      return;
    }
    navigate(`/movies?query=${encodeURIComponent(inputValue)}`);
  };

  return (
    <>
      <div className={css.container}>
        <Link to={location.state?.from || backLinkLocationRef.current}>
          Go back
        </Link>
        <SearchBar onSubmit={onSubmit} />
        <div className={css["navigation-container"]}>
          <NavLink to={"/"} className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to={"/movies"} className={buildLinkClass}>
            Movies
          </NavLink>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </>
  );
}
