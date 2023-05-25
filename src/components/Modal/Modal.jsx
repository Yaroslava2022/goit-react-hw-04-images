import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ largeImageURL, onClose, tags }) {

  useEffect(() => {
    window.addEventListener("keydown", onEscapeHandler);
    return () => {
    window.removeEventListener("keydown", onEscapeHandler);
    };
  });
  // componentDidMount() {
  //   window.addEventListener('keydown', this.onEscapeHandler);
  
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onEscapeHandler);
  // }
 
 const handleBackdrop = e => {
 
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onEscapeHandler = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      onClose();
    }
  };
  


    return( 
      <div className={css.overlay} onClick={handleBackdrop}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>)
  
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};