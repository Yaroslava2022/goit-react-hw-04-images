import { useState } from 'react'
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }){
	
  const [query, setQuery] = useState("");
	const onChangeHandler = (e) => {
        setQuery(e.target.value);
      };

      const onFormSubmitHandler = (e) => {
        e.preventDefault();
        if (query.trim() === "") {
            Notiflix.Notify.failure('Enter your query');
          return;
        }
       onSubmit(query);
       setQuery("");
      };
    
     
        return (
          <header className={css.searchBar}>
            <form className={css.searchForm} onSubmit={onFormSubmitHandler}>
              <button type="submit" className={css.searchFormButton}>
                <span className={css.searchFormButtonLabel}>Search</span>
              </button>
    
              <input
                className={css.searchFormInput}
                type="text"
                onChange={onChangeHandler}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={query}
              />
            </form>
          </header>
        );
      }
  
      Searchbar.propTypes = {
       onSubmit: PropTypes.func.isRequired,
      };