import styles from './error-notification.module.scss';

type ErrorNotificationProps = {
  children: React.ReactNode;
};

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  children,
}) => <div className={styles.errorNotification}>{children}</div>;
