import React from 'react';

import styles from './page-layout.module.scss';

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <div className={styles.pageLayoutWrapper}>
    <div className={styles.pageLayoutWrapperContent}>{children}</div>
  </div>
);
