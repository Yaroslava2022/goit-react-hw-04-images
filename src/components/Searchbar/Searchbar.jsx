import { Component } from 'react'
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

class Searchbar extends Component {
	state = { query: '',}

	onChangeHandler = e => {
        console.log(e.target.value);
        this.setState({
          query: e.target.value,
        });
      };
      onFormSubmitHandler = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            Notiflix.Notify.failure('Enter your query');
          return;
        }
        this.props.onSubmit(this.state);
        this.setState({
          query: '',
        });
      };
    
      render() {
        return (
          <header className={css.searchBar}>
            <form className={css.searchForm} onSubmit={this.onFormSubmitHandler}>
              <button type="submit" className={css.searchFormButton}>
                <span className={css.searchFormButtonLabel}>Search</span>
              </button>
    
              <input
                className={css.searchFormInput}
                type="text"
                onChange={this.onChangeHandler}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.query}
              />
            </form>
          </header>
        );
      }
    }

export default Searchbar