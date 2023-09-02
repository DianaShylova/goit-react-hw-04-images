import PropTypes from "prop-types";
import { useState } from 'react';
import css from "./Searchbar.module.css";


export const Searchbar = ({onChangeQuery}) => {
  
  const [searchItem, setSearchItem] = useState('');
 

  const handleSearchChange = e => {
   setSearchItem( e.target.value );
  };

  const handleFormBtn = e => {
      e.preventDefault();
      
    if (!searchItem.trim()) {
      alert('Please enter the text');
      return;
    }
    onChangeQuery(searchItem);
    setSearchItem('');
  }; 
  
    return (
        <header className={css.searchbar}>
        <form onSubmit={handleFormBtn} className={css.search_form}>
                <button type="submit" className={css.search_form_button}>
            <span className={css.search_form_button_label}>Search</span>
          </button>

          <input
            value={searchItem}
            onChange={handleSearchChange}
            className={css.search_form_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  
}

Searchbar.propTypes = {
  onChange: PropTypes.func,
};