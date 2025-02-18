import React, { useState, useEffect } from 'react';
import { UnsplashPhoto } from '@/types/unsplash';
import styles from '@/styles/components/imageGrid.module.scss';

interface ImageCardProps {
  photo: UnsplashPhoto;
  onClick: (photo: UnsplashPhoto) => void;
  delay?: number;
  isInitialLoad?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick, delay = 500, isInitialLoad = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const actualDelay = isInitialLoad ? 0 : delay;

    const timer = setTimeout(() => {
      const img = new Image();
      img.src = photo.urls.small;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
    }, actualDelay);

    return () => clearTimeout(timer);
  }, [photo.urls.small, delay, isInitialLoad]);

  return (
    <div
      className={styles.imageGrid__cardContainer}
      onClick={() => onClick(photo)}
    >
      <div
        className={`${styles.imageGrid__card} ${isLoaded ? styles.loaded : ''}`}
        style={{ backgroundImage: isLoaded ? `url(${photo.urls.thumb})` : 'none' }}
      >

        {!isLoaded && !hasError && (
          <div className={styles.placeholder}></div>
        )}

        {hasError && (
          <div className={styles.errorPlaceholder}>Ошибка загрузки</div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;