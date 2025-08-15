import { useEffect, useState } from 'react';
import { useMovieList } from '../../api';
import {
  ErrorNotification,
  LoadingSpinnerSection,
  MovieListItem,
  PageHeader,
  PageLayout,
  SectionHeader,
} from '../../components';
import { useIntl } from 'react-intl';

import styles from './movie-list.module.scss';
import { getImageSrc } from '../../shared';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const MovieList: React.FC = () => {
  const [movieSearchValue, setMovieSearchValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: movieList,
    isLoading: isLoadingMoviesList,
    error: movieListError,
  } = useMovieList(movieSearchValue, pageNumber);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setPageNumber(1);
  }, [movieSearchValue]);

  return (
    <PageLayout>
      <PageHeader
        hasInput
        inputValue={movieSearchValue}
        onInputValueChange={setMovieSearchValue}
      />
      <div className={styles.movieListResultWrapper}>
        <div className={styles.movieListResultHeaderWrapper}>
          <SectionHeader As="h2">
            {formatMessage({
              id: movieSearchValue
                ? 'movieList.sectionHeader.searchResults'
                : 'movieList.sectionHeader.popularMovies',
            })}
          </SectionHeader>
          <div className={styles.paginationButtonWrapper}>
            <button
              className={styles.paginationButton}
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((number) => number - 1)}
            >
              <FaArrowLeft />
            </button>
            <button
              className={styles.paginationButton}
              disabled={pageNumber === movieList?.total_pages}
              onClick={() => setPageNumber((number) => number + 1)}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {movieList?.results ? (
          <div className={styles.movieList}>
            {movieList?.results.map((result) => (
              <MovieListItem
                key={result.id}
                movieId={result.id}
                posterThumbnailSrc={getImageSrc(result.backdrop_path)}
                movieTitle={result.title}
                releaseDate={result.release_date}
                rating={result.vote_average}
              />
            ))}
          </div>
        ) : (
          <>
            {isLoadingMoviesList && <LoadingSpinnerSection />}
            {movieListError && (
              <ErrorNotification>
                {movieListError?.response?.data.status_message}
              </ErrorNotification>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};
