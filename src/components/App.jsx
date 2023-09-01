import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImages } from "service/galleryService";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { LoadMoreButton } from "./Button/Button";
import css from "./App.module.css";

export class App extends Component {
  state = {
    hits: [],
    query: '',
    page: '',
    isEmpty: false,
    showBtn: false,
    isError: '',
    isLoading: false,
    src: '',
    alt: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      /* this.setState({ isLoading: true }); */
      getImages(query, page)
        .then(({ hits, totalHits }) => {
          if (!totalHits) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
            showBtn: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => {
          this.setState({ isError: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  changeQuery = query => {
    this.setState({ query, hits: [], page: 1, isEmpty: false, isError: '' });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = ({ src, alt }) => {
    this.setState({ src, alt });
  };

  render() {
    const { hits, isEmpty, showBtn, isError, src, alt, isLoading } =
      this.state;
    return (
      <div className={css.app_container}>
        <Searchbar onChangeQuery={this.changeQuery} />
        <ImageGallery hits={hits} openModal={this.handleOpenModal} />
        {showBtn && <LoadMoreButton handleClick={this.loadMore} text="Load more" />}
        {isEmpty && <p>Sorry we nothing find😭</p>}
        {isError && <p>{isError}😭</p>}
        {src && <Modal closeModal={this.handleOpenModal} src={src} alt={alt} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}


/* export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
  );
};
 */