//libraries
import ReactModal from "react-modal";
// import toast, { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

//components
import MovieReviews from "./MovieReviews";
import MovieCast from "./MovieCast";
import Loader from "./Loader";
import Navigation from "./Navigation";
import MovieTrailer from "./MovieTrailer";

//Pages
import { HomePage, MoviesPage, NotFoundPage, MovieDetailsPage } from "../pages";

//api
import { ApiComponent } from "../axios";

//styles
import "./App.css";

function App() {
  ReactModal.setAppElement("#root");
  const location = useLocation();
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const goBack = () => {
    console.log(location);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Navigation goBack={goBack} />

        <Routes>
          <Route path="/" element={<HomePage imgPath={imgPath} />} />
          <Route path="/movies" element={<MoviesPage imgPath={imgPath} />} />
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage imgPath={imgPath} />}
          >
            <Route
              path="reviews"
              element={<MovieReviews imgPath={imgPath} />}
            />
            <Route path="trailer" element={<MovieTrailer />} />
            <Route path="cast" element={<MovieCast imgPath={imgPath} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
     
    </Suspense>
  );
}

export default App;
