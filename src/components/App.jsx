import { useState, useEffect } from 'react';
import css from './App.module.css';
import Notiflix from 'notiflix';
import { Audio } from  'react-loader-spinner'
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/button';
import Modal from './Modal/Modal';
import { mapper } from './mapper';
import api from 'api/api';

export default function App() {
  const [query, setQuery] = useState("");
  const [largeImageURL, setLargeImageURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // state = {
  //   query: '',
  //   largeImageURL: '',
  //   showModal: false,
  //   page: 1,
  //   images: [],
  //   error: null,
  //   loading: false,
  // };

  const toggleModal = largeImageURL => {
    
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    // console.log('click  on list', largeImageURL);
    // this.setState(prevState => ({
    //   showModal: !prevState.showModal,
    //   largeImageURL: largeImageURL,
    // }));
  };

 const handleSearchSubmit = (searchData) => {
    console.log(searchData);
    
    setQuery(searchData);
    setImages([]);
    setPage(1);
    // this.setState({
    //   images: [],
    //   page: 1,
    //   query: searchData.query,
    // });
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    console.log(query);
    fetchImgOnQuery();
  }, [query]);
  // componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevState.query;
  //   const newQuery = this.state.query;
  //   // const queryPage = this.state.page;

  //   if (prevQuery !== newQuery) {
  //     // this.setState({
  //     //   images: [],
  //     // });
  //     this.fetchImgOnQuery();
  //   }
  // }

  
  const fetchImgOnQuery = () => {
    // const { query, page } = this.state;
    const { fetchImages } = api;

    if (!query) {
      return;
    }
    setLoading(true);

    fetchImages(query, page)
      .then(data => {
        console.log(data);
        if (data.hits.length === 0) {
          Notiflix.Notify.failure('No  images  found');
          return;
        }
        setImages([...images, ...mapper(data.hits)]);
        setPage(page + 1)
        setLoading(false);
        // this.setState(prevState => ({
        //   images: [...prevState.images, ...mapper(data.hits)],
        //   page: prevState.page + 1,
        // }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        
      })
      .catch((error) => setError(error))
      .finally(setLoading(false));
  };



    return (
      <div className={css.container}>
      
        <Searchbar onSubmit={handleSearchSubmit} />
        {loading && (
          <div className={css.style}>
                <Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />
          </div>
        )}

        {images.length > 0 && (
          <ImageGallery
            images={images}
            query={query}
            onImgClick={toggleModal}
          />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
        )}
        {images.length > 11 && !loading && (
          <Button onClick={fetchImgOnQuery} />
        )}
      </div>
    );
  }
