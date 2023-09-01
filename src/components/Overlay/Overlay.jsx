import css from "./Overlay.module.css";

export const OverLay = ({ children, onClick }) => {
  return <div className={css.backdrop} onClick={onClick}> {children} </div>;
};