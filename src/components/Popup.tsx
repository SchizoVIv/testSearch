import React, { useEffect, useState } from 'react';
import Portal from '@/components/Portal';
import styles from '@/styles/components/popup.module.scss';
import { ARIA_MESSAGE_CLOSE } from '@/utils/constants';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <Portal>
      <div
        className={`${styles.popupOverlay} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
      >
        <div
          className={`${styles.popupContent} ${isOpen ? styles.open : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label={ARIA_MESSAGE_CLOSE}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black" fillOpacity="0.4" />
          </svg>
        </button>
      </div>
    </Portal>
  );
};

export default Popup;