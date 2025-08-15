import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import {
  api,
  ApiPath,
  requestDefaultParams,
  type MovieListResultsResponse,
  type ResponseError,
} from '../shared';

const MOVIE_LIST_QUERY_KEY = 'movie-list-query';
const REQUEST_PARAMS = {
  sort_by: 'popularity.desc',
};

const getPopularMovieList = () =>
  api
    .get<MovieListResultsResponse>(ApiPath.MOVIE_LIST, {
      params: {
        ...requestDefaultParams,
        ...REQUEST_PARAMS,
      },
    })
    .then(({ data }) => data);

const getSearchedMovieList = (query: string) =>
  api
    .get<MovieListResultsResponse>(ApiPath.SEARCH, {
      params: {
        ...requestDefaultParams,
        query,
      },
    })
    .then(({ data }) => data);

export const useMovieList = (movieSearchValue?: string) => {
  const [debouncedValue] = useDebounce(movieSearchValue, 500);

  return useQuery<MovieListResultsResponse, ResponseError>({
    queryKey: [MOVIE_LIST_QUERY_KEY, debouncedValue],
    queryFn: () =>
      debouncedValue
        ? getSearchedMovieList(debouncedValue)
        : getPopularMovieList(),
  });
};
