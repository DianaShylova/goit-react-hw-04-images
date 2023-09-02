import { OverLay } from "components/Overlay/Overlay";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const modal_root = document.getElementById('root');

export const Modal = ({closeModal, alt, src}) => {

  useEffect(() => {
   
    const handleEscape = e => {
      if (e.key === 'Escape') {
        closeModal({ src: '', alt: '' });
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal]);  

    const handleOverLay = e => {
      if (e.target === e.currentTarget) {
        closeModal({ src: '', alt: '' });
      }
    };

  
    return (
      <>
        {createPortal(
          <OverLay onClick={handleOverLay}>
            <img src={src} alt={alt} width="70%" />
          </OverLay>,
          modal_root
        )}
      </>
    );
  }
