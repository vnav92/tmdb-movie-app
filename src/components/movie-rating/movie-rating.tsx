import { FaStar } from 'react-icons/fa';

import styles from './movie-rating.module.scss';

type MovieRatingProps = {
  rating: number;
};

export const MovieRating: React.FC<MovieRatingProps> = ({ rating }) => (
  <div className={styles.movieRating}>
    <FaStar className={styles.movieRatingIcon} />
    {rating?.toFixed(1)}
  </div>
);
