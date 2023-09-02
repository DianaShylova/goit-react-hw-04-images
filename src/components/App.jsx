import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImages } from "service/galleryService";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { LoadMoreButton } from "./Button/Button";
import css from "./App.module.css";

export const App = () => {
  const [pics, setPics] = useState([]);
  const [params, setParams] = useState({
    query: '',
    page: 1,
  });
  const [status, setStatus] = useState({
    isError: '',
    isLoading: false,
  }); 
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [modal, setModal] = useState({
    src: '',
    alt: '',
  });
  
  useEffect(() => {
    const { query, page } = params;
    if (query === '') return;
      setStatus({ isLoading: true, isError: ''});
      getImages(query, page)
        .then(({ hits, totalHits }) => {
          if (!totalHits) {
            setIsEmpty(true) ;
            return;
          }
          setPics([...pics, ...hits]);
          setShowBtn(params.page < Math.ceil(totalHits / 12));         
        })
        .catch(error => {
          setStatus({ isError: error.message, isLoading: false });
        })
        .finally(() => {
         setStatus({ isError: "", isLoading: false });
        });
   
    }, [params.query]);
  
  
 

  const changeQuery = query => {
    setPics([]);
    setStatus({
      isError: '',
      isLoading: false,
    });
    setIsEmpty(false);
    setParams({
      query,
      page: 1,
    });   
    
  };

  const loadMore = () => {
    setParams({...params, page: params.page + 1});
  };

  const handleOpenModal = ({ src, alt }) => {
    setModal({ src, alt });
  };

  
    return (
      <div className={css.app_container}>
        <Searchbar onChangeQuery={changeQuery} />
        <ImageGallery hits={pics} openModal={handleOpenModal} />
        {showBtn && <LoadMoreButton handleClick={loadMore} text="Load more" />}
        {isEmpty && <p>Sorry we nothing find😭</p>}
        {status.isError && <p>{status.isError}😭</p>}
        {modal.src && <Modal closeModal={handleOpenModal} src={modal.src} alt={modal.alt} />}
        {status.isLoading && <Loader />}
      </div>
    );
  
} 


