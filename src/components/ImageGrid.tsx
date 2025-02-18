import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UnsplashPhoto } from '@/types/unsplash';
import LoadingSpinner from '@/components/LoadingSpinner';
import ImageCard from '@/components/ImageCard';
import styles from '@/styles/components/imageGrid.module.scss';

interface ImageGridProps {
  photos: UnsplashPhoto[];
  onImageClick: (photo: UnsplashPhoto) => void;
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
  page: number;
}

const ImageGrid: React.FC<ImageGridProps> = ({ photos, onImageClick, hasMore, loadMore, isLoading, page }) => {
  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={loadMore}
      hasMore={hasMore}
      loader={isLoading && page === 1 && <LoadingSpinner />}
    >
      <div className={styles.imageGrid}>
        {photos.length === 0 && isLoading ? (
          <div className={styles.loadingScreen}>
            <LoadingSpinner />
          </div>
        ) : (
          photos.map((photo, index) => (
            <ImageCard 
              key={`${photo.id}-${index}`} 
              photo={photo} 
              onClick={onImageClick} 
              isInitialLoad={page === 1}
            />
          ))
        )}
      </div>
    </InfiniteScroll>
  );
};

export default ImageGrid;