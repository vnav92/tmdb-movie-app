import classNames from 'classnames';

import styles from './section-header.module.scss';

type SectionHeaderProps = {
  As: 'h2' | 'h3' | 'h4';
  className?: string;
  children: React.ReactNode;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  As,
  className,
  children,
}) => (
  <As className={classNames(styles.sectionHeader, className)}>{children}</As>
);
