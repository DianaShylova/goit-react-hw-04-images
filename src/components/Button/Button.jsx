import PropTypes from 'prop-types';
import css from "./Button.module.css";

export const LoadMoreButton = ({ handleClick, text }) => {
  return (
    <button className = {css.loadmore_btn} type="button" onClick={handleClick}>
      {text}
    </button>
  );
};


LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};