//libraries
import ReactModal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";

//components
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn";
import ImageModal from "./ImageModal";

//api
import { ApiComponent } from "../axios";

//styles
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [valuesForModal, setValuesForModal] = useState({});
  const [query, setQuery] = useState("nature");
  const [page, setPage] = useState(1);

  ReactModal.setAppElement("#root");

  const apiRef = useRef(new ApiComponent()).current;

  useEffect(() => {
    if (!query) {
      toast.error("Write anything!");
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        setLoadMore(false);

        if (page === 1) {
          setPhotos([]);
        }

        const data = await apiRef.fetchPhotos(query, page);
        const totalHits = data.total;
        const totalPages = Math.ceil(totalHits / apiRef.limit);

        setPhotos((prev) => {
          if (page === 1) return data.results;
          const existingIds = new Set(prev.map((p) => p.id));
          const newUnique = data.results.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newUnique];
        });

        setLoadMore(page < totalPages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, apiRef, page]);

  const modalHandleClick = (e) => {
    const { id } = e.target;
    const img = photos.find((photo) => photo.id == id);
    setValuesForModal(img);
    setIsOpen(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    if (!inputValue) {
      toast.error("Write something!");
      return;
    }
    setPhotos([]);
    setPage(1);
    setQuery(inputValue.trim());
  };

  const handleLoadMore = async () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <div className="gallery-loader-container">
        {photos.length > 0 && (
          <ImageGallery onClick={modalHandleClick} photos={photos} />
        )}
        {loading && <Loader />}
        {error && <ErrorMessage />}
        <Toaster position="top-left" />
      </div>
      {loadMore && <LoadMoreBtn onClick={handleLoadMore} />}

      <ImageModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        valuesForModal={valuesForModal}
      />
    </>
  );
}

export default App;
