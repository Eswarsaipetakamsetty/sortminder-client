import React from 'react';
import styles from '@/styles/PopUp.module.css';
import Router, { useRouter } from 'next/router';

interface CongratulationPopupProps {
  message?: string;
}

const CongratulationPopup: React.FC<CongratulationPopupProps> = ({ message }) => {
  const navigate = useRouter();

  const handleClose = () => {
    navigate.push('/home'); // redirects to homepage
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupBox}>
        <h2>🎉 Congratulations!</h2>
        <p>{message || "You have successfully submitted your code!"}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default React.memo(CongratulationPopup);
