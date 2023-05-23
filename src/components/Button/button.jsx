import PropTypes from 'prop-types';
import css from './button.module.css';

export function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={css.button}>
      Load more
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};