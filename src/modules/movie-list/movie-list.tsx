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
import { getImageSrc, type ListVariant } from '../../shared';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

type NonSearchListVariant = Exclude<ListVariant, 'search'>;

const DEFAULT_LIST_VARIANT = 'popular';

export const MovieList: React.FC = () => {
  const [movieSearchValue, setMovieSearchValue] = useState('');
  const [listVariant, setListVariant] = useState<ListVariant>(DEFAULT_LIST_VARIANT);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: movieList,
    isLoading: isLoadingMoviesList,
    error: movieListError,
  } = useMovieList(movieSearchValue, pageNumber, listVariant);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setPageNumber(1);
    setListVariant(movieSearchValue ? 'search' : DEFAULT_LIST_VARIANT)
  }, [movieSearchValue]);


  const listVariantToSectionTitleTranslationIdMap: Record<ListVariant, string> = {
    search: 'movieList.sectionHeader.searchResults',
    popular: 'movieList.sectionHeader.popularMovies',
    'top-rated': 'movieList.sectionHeader.topRatedMovies',
  }
  
  const listVariantToButtonTextTranslationIdMap: Record<NonSearchListVariant, string> = {
    popular: 'movieList.sectionHeader.changeListVariantButton.changeToTopRated',
    'top-rated': 'movieList.sectionHeader.changeListVariantButton.changeToToPopular'
  }

  const buttonClickListVariantConfig: Record<NonSearchListVariant, NonSearchListVariant> = {
    popular: 'top-rated',
    'top-rated': 'popular'
  }

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
            {formatMessage({ id: listVariantToSectionTitleTranslationIdMap[listVariant] })}
          </SectionHeader>
          <div className={styles.movieListViewConfigurationSection}>
            {listVariant !== 'search' && (
            <Button
              onClick={() => {
                setListVariant((variant) => buttonClickListVariantConfig[variant as NonSearchListVariant])
              }}
              className={styles.movieListViewConfigurationSectionButton}
            >
              {formatMessage({ id: listVariantToButtonTextTranslationIdMap[listVariant] })}
            </Button>
            )} 
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
