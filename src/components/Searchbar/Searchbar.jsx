import PropTypes from "prop-types";
import { Component } from 'react';
import css from "./Searchbar.module.css";


export class Searchbar extends Component {
  state = {
    searchItem: '',
  };

  handleSearchChange = e => {
    this.setState({ searchItem: e.target.value });
  };

  handleFormBtn = e => {
      e.preventDefault();
      const { searchItem } = this.state;
    if (!searchItem.trim()) {
      alert('Please enter the text');
      return;
    }
    this.props.onChangeQuery(searchItem);
    this.setState({ searchItem: '' });
  };

 
  render() {
    return (
        <header className={css.searchbar}>
        <form onSubmit={this.handleFormBtn} className={css.search_form}>
                <button type="submit" className={css.search_form_button}>
            <span className={css.search_form_button_label}>Search</span>
          </button>

          <input
            value={this.state.inputValue}
            onChange={this.handleSearchChange}
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
}

Searchbar.propTypes = {
  onChange: PropTypes.func,
};