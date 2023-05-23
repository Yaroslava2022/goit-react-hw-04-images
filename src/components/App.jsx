import { Component } from 'react';
import css from './App.module.css';
import Notiflix from 'notiflix';
import { Audio } from  'react-loader-spinner'
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/button';
import Modal from './Modal/Modal';
import { mapper } from './mapper';
import api from 'api/api';
export default class App extends Component {
  state = {
    query: '',
    largeImageURL: '',
    showModal: false,
    page: 1,
    images: [],
    error: null,
    loading: false,
  };

  toggleModal = largeImageURL => {
    // console.log('click  on list', largeImageURL);
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: largeImageURL,
    }));
  };

  handleSearchSubmit = searchData => {
    console.log(searchData);
    this.setState({
      images: [],
      page: 1,
      query: searchData.query,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;
    // const queryPage = this.state.page;

    if (prevQuery !== newQuery) {
      // this.setState({
      //   images: [],
      // });
      this.fetchImgOnQuery();
    }
  }

  
  fetchImgOnQuery = () => {
    const { query, page } = this.state;
    const { fetchImages } = api;

    if (!query) {
      return;
    }
    this.setState({ loading: true });
    fetchImages(query, page)
      .then(data => {
        console.log(data);
        if (data.hits.length === 0) {
          Notiflix.Notify.failure('No  images  found');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(data.hits)],
          page: prevState.page + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        
      })
      .catch(error => this.setState({ error }))
      .finally(this.setState({ loading: false }));
  };

  render() {
    
    const { loading, images, query, largeImageURL, showModal } = this.state;

    return (
      <div className={css.container}>
      
        <Searchbar onSubmit={this.handleSearchSubmit} />
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
            onImgClick={this.toggleModal}
          />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
        {images.length > 11 && !loading && (
          <Button onClick={this.fetchImgOnQuery} />
        )}
      </div>
    );
  }
}