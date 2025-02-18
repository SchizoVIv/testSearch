import React from 'react';
import styles from '@/styles/components/Loader.module.scss';
import {bladesCount} from '@/utils/constants'

const LoadingSpinner: React.FC = () => {

  return (
    <div className={`${styles.spinner} ${styles.center}`}>
      {Array.from({ length: bladesCount }).map((_, index) => (
        <div
          key={index}
          className={styles.spinnerBlade}
          style={{
            transform: `rotate(${index * (360 / bladesCount)}deg)`,
            animationDelay: `${index * (1 / bladesCount)}s`,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;