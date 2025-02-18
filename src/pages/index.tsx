import React, { useState, useRef, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { UnsplashPhoto } from '@/types/unsplash';
import usePhotos from '@/hooks/usePhotos';
import SearchBar from '@/components/SearchBar';
import ImageGrid from '@/components/ImageGrid';
import PhotoPopup from '@/components/PhotoPopup';
import styles from '@/styles/components/home.module.scss';
import { MESSAGE_SEARCH } from '@/utils/constants';

const Home: React.FC = () => {
  const { photos, isLoading, hasMore, handleSearch, loadMore, isEmpty, page } = usePhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', appHeight);
    appHeight();

    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      if (!target) return;

      if (target.scrollTop === 0) {
        target.scrollTop = 1;
      } else if (
        target.scrollHeight ===
        target.scrollTop + target.offsetHeight
      ) {
        target.scrollTop -= 1;
      }
    };

    const imageGridContainer = imageGridRef.current;
    if (imageGridContainer) {
      imageGridContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (imageGridContainer) {
        imageGridContainer.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  return (
    <main className={styles.container}>
      <SearchBar onSearch={(query) => handleSearch(query, 1)} />
      {isEmpty && photos.length === 0 ? (
        <p className={styles.message}>{MESSAGE_SEARCH}</p>
      ) : (
        <div ref={imageGridRef}>
          <ImageGrid
            photos={photos}
            onImageClick={setSelectedPhoto}
            hasMore={hasMore}
            loadMore={loadMore}
            isLoading={isLoading}
            page={page}
          />
        </div>
      )}
      <PhotoPopup 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;