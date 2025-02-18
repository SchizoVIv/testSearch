import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { searchPhotos } from '@/utils/api';
import { UnsplashPhoto, UnsplashSearchResponse } from '@/types/unsplash';
import { debounce } from 'lodash';
import { MESSAGE_SEARCH_ERROR, MESSAGE_SEARCH_TRY_ERROR } from '@/utils/constants';

const usePhotos = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const currentQuery = useRef<string>('');

  const processPhotosData = (data: UnsplashSearchResponse, page: number) => {
    console.log()
    if (data.results.length === 0 && page === 1) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    if (page === 1) {
      setPhotos(data.results);
    } else {
      setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
    }
    setHasMore(data.total_pages > page);
  };

  const handleSearch = useCallback(async (query: string, page: number = 1) => {
    if (!query) return;

    setIsLoading(true);
    setError(null);
    currentQuery.current = query;

    if (page === 1) {
      setPhotos([]);
    }

    try {
      const data = await searchPhotos(query, page);
      processPhotosData(data, page);
    } catch (error: unknown) {
      console.error(MESSAGE_SEARCH_ERROR, error);
      setError(MESSAGE_SEARCH_TRY_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [currentQuery]);

  const loadMore = useMemo(() => {
    return debounce(() => {
      if (!isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 300);
  }, [isLoading, hasMore]);
  
  useEffect(() => {
    return () => {
      loadMore.cancel();
    };
  }, [loadMore]);

  useEffect(() => {
    if (page > 1) {
      handleSearch(currentQuery.current, page);
    }
  }, [page, handleSearch]);

  return {
    photos,
    isLoading,
    error,
    hasMore,
    handleSearch,
    loadMore,
    currentQuery,
    isEmpty,
    page,
  };
};

export default usePhotos;