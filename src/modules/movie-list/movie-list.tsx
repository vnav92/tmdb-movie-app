import { useState } from 'react';
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

export const MovieList: React.FC = () => {
  const [movieSearchValue, setMovieSearchValue] = useState('');
  const {
    data: movieList,
    isLoading: isLoadingMoviesList,
    error: movieListError,
  } = useMovieList(movieSearchValue);
  const { formatMessage } = useIntl();

  return (
    <PageLayout>
      <PageHeader
        hasInput
        inputValue={movieSearchValue}
        onInputValueChange={setMovieSearchValue}
      />
      <div className={styles.movieListResultWrapper}>
        <SectionHeader As="h2">
          {formatMessage({
            id: movieSearchValue
              ? 'movieList.sectionHeader.searchResults'
              : 'movieList.sectionHeader.popularMovies',
          })}
        </SectionHeader>
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
