import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export default function ItemGallery({ images, onImgClick }) {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li className={css.galleryItem} key={id}>
            <ImageGalleryItem
              webformatURL={webformatURL}
              onModal={onImgClick}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          </li>
        );
      })}
    </ul>
  );
}

ItemGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImgClick: PropTypes.func.isRequired,
};