import { useIntl } from 'react-intl';
import styles from './movie-list-item.module.scss';
import { SectionHeader } from '../section-header';

import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

import { MovieRating } from '../movie-rating';
import { Link } from '../link';

type MovieListItemProps = {
  movieId: number;
  movieTitle: string;
  posterThumbnailSrc: string;
  releaseDate: string;
  rating: number;
};

export const MovieListItem: React.FC<MovieListItemProps> = ({
  movieId,
  movieTitle,
  posterThumbnailSrc,
  releaseDate,
  rating,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.movieListItem}>
      <img
        className={styles.movieListItemImage}
        src={posterThumbnailSrc}
        alt={formatMessage(
          { id: 'movieListItem.posterAltText' },
          { movieTitle },
        )}
      />
      <div className={styles.moviwListItemInformationWrapper}>
        <div className={styles.moviwListItemInformationWrapperMain}>
          <SectionHeader
            className={styles.movieListItemInformationWrapperTitle}
            As="h4"
          >
            {movieTitle}
          </SectionHeader>
          <div className={styles.movieListItemInformationWrapperReleaseDate}>
            <FaCalendarAlt />
            {releaseDate}
          </div>
          <MovieRating rating={rating} />
        </div>
        <div className={styles.movieListItemInformationLinkWrapper}>
          <Link href={`/movie-list/${movieId}/details`}>
            {formatMessage({ id: 'movieListItem.seeDetailsButton' })}
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
