import { IonButton, IonIcon } from '@ionic/react';
import { chevronBack, chevronForward } from 'ionicons/icons';
import { useState } from 'react';

const TOTAL_PAGES = 20; // puedes cambiarlo o pasarlo como prop

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const maxVisibleButtons = 4;

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (startPage > 1) {
      setStartPage(startPage - maxVisibleButtons);
    }
  };

  const handleNext = () => {
    if (startPage + maxVisibleButtons <= TOTAL_PAGES) {
      setStartPage(startPage + maxVisibleButtons);
    }
  };

  const visiblePages = Array.from(
    { length: Math.min(maxVisibleButtons, TOTAL_PAGES - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}>
      <IonButton fill="clear" onClick={handlePrev} disabled={startPage === 1}>
        <IonIcon icon={chevronBack} />
      </IonButton>

      {visiblePages.map((page) => (
        <IonButton
          key={page}
          fill={page === currentPage ? 'outline' : 'clear'}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </IonButton>
      ))}

      <IonButton
        fill="clear"
        onClick={handleNext}
        disabled={startPage + maxVisibleButtons > TOTAL_PAGES}
      >
        <IonIcon icon={chevronForward} />
      </IonButton>
    </div>
  );
};

export default Pagination;
