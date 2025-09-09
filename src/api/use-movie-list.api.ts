import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import {
  api,
  ApiPath,
  requestDefaultParams,
  type ListVariant,
  type MovieListResultsResponse,
  type ResponseError,
} from '../shared';

const MOVIE_LIST_QUERY_KEY = 'movie-list-query';
const REQUEST_PARAMS = {
  sort_by: 'popularity.desc',
};

const getMovieList = (pageNumber: number, listVariant: ListVariant) => api
    .get<MovieListResultsResponse>(listVariant === 'popular' ? ApiPath.MOVIE_LIST : ApiPath.MOVIE_LIST_TOP_RATED, {
      params: {
        ...requestDefaultParams,
        ...REQUEST_PARAMS,
        page: pageNumber,
      },
    })
    .then(({ data }) => data);

const getSearchedMovieList = (query: string, pageNumber: number) =>
  api
    .get<MovieListResultsResponse>(ApiPath.SEARCH, {
      params: {
        ...requestDefaultParams,
        query,
        page: pageNumber,
      },
    })
    .then(({ data }) => data);

export const useMovieList = (
  movieSearchValue: string = '',
  pageNumber: number,
  listVariant: ListVariant
) => {
  const [debouncedValue] = useDebounce(movieSearchValue, 500);

  return useQuery<MovieListResultsResponse, ResponseError>({
    queryKey: [MOVIE_LIST_QUERY_KEY, debouncedValue, pageNumber, listVariant],
    queryFn: () =>
      debouncedValue
        ? getSearchedMovieList(debouncedValue, pageNumber)
        : getMovieList(pageNumber, listVariant),
  });
};
