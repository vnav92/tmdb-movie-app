import { Link as DefaultLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './link.module.scss';

type LinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export const Link: React.FC<LinkProps> = ({ href, className, children }) => (
  <DefaultLink className={classNames(styles.link, className)} to={href}>
    {children}
  </DefaultLink>
);
