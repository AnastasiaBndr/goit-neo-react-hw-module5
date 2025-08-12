import css from "./Loader.module.css";
import { PuffLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
}

export default function Loader() {
  return (
    <><PuffLoader
      color={"black"}
      size={80}
      loading={true}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader" /></>
  );
}
