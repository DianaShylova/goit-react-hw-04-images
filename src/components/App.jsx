import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImages } from "service/galleryService";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { LoadMoreButton } from "./Button/Button";
import css from "./App.module.css";

export const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState('');
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  
  useEffect(() => {
    
    if (!query){
      return;
    }
     /*  setStatus({ isLoading: true, isError: ''}) */;
      getImages(query, page)
        .then(({ hits, totalHits }) => {
          if (!totalHits) {
            setIsEmpty(true) ;
            return;
          }
          setHits(prevState => [...prevState, ...hits]);
          setShowBtn(page < Math.ceil(totalHits / 12));         
        })
        .catch(isError => {
          setIsError( isError.message);
        })
        .finally(() => {
         setIsLoading(false);
        });
   
    }, [query, page]);
  
  
 

  const changeQuery = query => {

    setQuery(query);
    setHits([]);
    setPage(1);
    setIsEmpty(false);
    setIsError('');
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOpenModal = ({ src, alt }) => {
    setSrc(src);
    setAlt(alt);
  };

  
    return (
      <div className={css.app_container}>
        <Searchbar onChangeQuery={changeQuery} />
        <ImageGallery hits={hits} openModal={handleOpenModal} />
        {showBtn && <LoadMoreButton handleClick={loadMore} text="Load more" />}
        {isEmpty && <p>Sorry we nothing find😭</p>}
        {isError && <p>{isError}😭</p>}
        {src && <Modal closeModal={handleOpenModal} src={src} alt={alt} />}
        {isLoading && <Loader />}
      </div>
    );
  
} 


