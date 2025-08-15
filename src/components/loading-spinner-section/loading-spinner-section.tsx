import { useIntl } from 'react-intl';
import Spinner from 'react-bootstrap/Spinner';

import styles from './loading-spinner-section.module.scss';

export const LoadingSpinnerSection: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div className={styles.loadingSpinnerSectionWrapper}>
      <Spinner
        animation="grow"
        role="status"
        size="sm"
        aria-label={formatMessage({ id: 'global.loading' })}
        className={styles.spinner}
      >
        {formatMessage({ id: 'global.loading' })}
      </Spinner>
    </div>
  );
};
