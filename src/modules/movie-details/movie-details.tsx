import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FaArrowLeft } from 'react-icons/fa';

import { useMovieDetails } from '../../api';
import {
  PageHeader,
  PageLayout,
  SectionHeader,
  LoadingSpinnerSection,
  ErrorNotification,
} from '../../components';

import styles from './movie-details.module.scss';
import { getImageSrc } from '../../shared';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { MdOutlineLanguage } from 'react-icons/md';
import { MovieRating } from '../../components/movie-rating';
import { Link } from '../../components/link';

const parseMinutesToTime = (numberOfMinutes: number) => {
  const hours = Math.floor(numberOfMinutes / 60);
  const minutes = numberOfMinutes % 60;

  const numberOfHours = String(hours);
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${numberOfHours}:${paddedMinutes}`;
};

export const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const {
    data: movieDetails,
    isLoading: isLoadingMovieDetails,
    error: movieDetailsError,
  } = useMovieDetails(id);
  const { formatMessage } = useIntl();

  return (
    <PageLayout>
      <PageHeader />
      {movieDetails?.title ? (
        <div className={styles.movieDetails}>
          <img
            className={styles.movieDetailsImage}
            src={getImageSrc(movieDetails?.poster_path)}
            alt={formatMessage(
              { id: 'movieListItem.posterAltText' },
              { movieTitle: movieDetails?.title },
            )}
          />
          <div className={styles.movieDetailsInformation}>
            <div className={styles.movieDetailsInformationPart}>
              <SectionHeader
                As="h2"
                className={styles.movieDetailsInformationHeader}
              >
                {movieDetails?.title}
              </SectionHeader>
              <div className={styles.movieDetailsInformationGenreWrapper}>
                {movieDetails?.genres?.map((genre, index) => (
                  <div
                    key={index}
                    className={styles.movieDetailsInformationGenreTag}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
              <div className={styles.movieDetailsInformationItem}>
                <FaCalendarAlt />
                {movieDetails?.release_date}
              </div>
              <hr className={styles.separator} />
              <div className={styles.movieDetailsInformationItem}>
                <FaRegClock />
                {formatMessage(
                  { id: 'movieDetails.time' },
                  { time: parseMinutesToTime(movieDetails?.runtime) },
                )}
              </div>
              <hr className={styles.separator} />
              {movieDetails?.spoken_languages?.[0]?.english_name && (
                <div className={styles.movieDetailsInformationItem}>
                  <MdOutlineLanguage />
                  {movieDetails?.spoken_languages?.[0]?.english_name}
                  <hr className={styles.separator} />
                </div>
              )}
            </div>
            <div className={styles.movieDetailsInformationPart}>
              <MovieRating rating={movieDetails.vote_average} />
              <p className={styles.movieDescription}>
                {movieDetails?.overview}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoadingMovieDetails && <LoadingSpinnerSection />}
          {movieDetailsError && (
            <ErrorNotification>
              {movieDetailsError?.response?.data.status_message}
            </ErrorNotification>
          )}
        </>
      )}
      <Link href="/" className={styles.movieDetailsBackToMainPage}>
        <FaArrowLeft />
        {formatMessage({ id: 'movieDetails.backToListLink' })}
      </Link>
    </PageLayout>
  );
};
