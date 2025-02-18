import React from 'react';
import Image from 'next/image';
import Popup from '@/components/Popup';
import { UnsplashPhoto } from '@/types/unsplash';
import styles from '@/styles/components/popup.module.scss';

interface PhotoPopupProps {
  photo: UnsplashPhoto | null;
  onClose: () => void;
}

const PhotoPopup: React.FC<PhotoPopupProps> = ({ photo, onClose }) => {
  return (
    <Popup isOpen={!!photo} onClose={onClose}>
      {photo && (
        <Image
          src={photo.urls.regular}
          alt={photo.alt_description}
          className={styles.popupContent}
          width={photo.width}
          height={photo.height}
        />
      )}
    </Popup>
  );
};

export default PhotoPopup;