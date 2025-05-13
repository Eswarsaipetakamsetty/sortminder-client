import React from 'react';
import styles from "@/styles/LoadingSpinner.module.css"

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner} />
    </div>
  );
};

export default React.memo(LoadingSpinner); // prevents unnecessary re-renders
