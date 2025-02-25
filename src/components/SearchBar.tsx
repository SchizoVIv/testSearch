import React, { useState, useRef } from 'react';
import styles from '@/styles/components/searchBar.module.scss';
import { 
  MESSAGE_SERCH_INPUT_PH, 
  MESSAGE_SERCH_INPUT_ARIA,
  MESSAGE_SERCH_BUTTON_CLEAR_ARIA 
} from '@/utils/constants';

const ClearIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.46875 16.4297C12.8828 16.4297 16.5391 12.7812 16.5391 8.35938C16.5391 3.94531 12.8828 0.289062 8.46094 0.289062C4.04688 0.289062 0.398438 3.94531 0.398438 8.35938C0.398438 12.7812 4.05469 16.4297 8.46875 16.4297ZM5.90625 11.6719C5.49219 11.6719 5.17188 11.3438 5.17188 10.9219C5.17188 10.7344 5.25 10.5547 5.39062 10.4141L7.42969 8.36719L5.39062 6.32812C5.25 6.1875 5.17188 6.00781 5.17188 5.8125C5.17188 5.39844 5.49219 5.08594 5.90625 5.08594C6.11719 5.08594 6.28125 5.15625 6.42188 5.29688L8.46875 7.33594L10.5312 5.28906C10.6797 5.14062 10.8438 5.07031 11.0547 5.07031C11.4609 5.07031 11.7812 5.39062 11.7812 5.80469C11.7812 6 11.7188 6.17188 11.5703 6.32031L9.52344 8.36719L11.5625 10.4062C11.7031 10.5469 11.7812 10.7266 11.7812 10.9219C11.7812 11.3438 11.4531 11.6719 11.0391 11.6719C10.8281 11.6719 10.6406 11.5938 10.5078 11.4531L8.46875 9.41406L6.44531 11.4531C6.29688 11.5938 6.11719 11.6719 5.90625 11.6719Z"
      fill="#C4C4C4"
    />
  </svg>
);

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === '') return;
    onSearch(query);
    setIsActive(true);
  };

  const handleClearInput = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={`${styles.search} ${isActive ? styles.active : ''}`}>
      <form onSubmit={handleSubmit} className={styles.search__form}>
        <div className={styles.search__boxInput}>
          <div className={styles.searchIcon}></div>
          <input
            type="text"
            ref={inputRef}
            value={query}
            aria-label={MESSAGE_SERCH_INPUT_ARIA}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={MESSAGE_SERCH_INPUT_PH}
            className={styles.search__input}
          />
          {query.length > 0 && (
            <button
              className={styles.search__buttonClear}
              type="button"
              onClick={handleClearInput}
              aria-label={MESSAGE_SERCH_BUTTON_CLEAR_ARIA}
            >
              <ClearIcon />
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className={styles.search__buttonSearch}
          disabled={query.trim() === ''}
          aria-label="Начать поиск"
        >
          Искать
        </button>
      </form>
    </div>
  );
};

export default SearchBar;