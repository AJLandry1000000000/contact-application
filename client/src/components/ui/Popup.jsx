import React, { useEffect } from 'react';
import '@/components/ui/Popup.css';

const Popup = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup ${type}`}>
      {message}
    </div>
  );
};

export default Popup;