import { useQuery } from '@tanstack/react-query';
import { api, ApiPath, requestDefaultParams } from '../shared';
import type { MovieListResultsResponse, ResponseError } from '../shared';

const POPULAR_MOVIE_LIST_QUERY_KEY = 'popular-movie-list-query';
const REQUEST_PARAMS = {
  sort_by: 'popularity.desc',
};

const getPopularMovieList = () =>
  api
    .get<MovieListResultsResponse>(ApiPath.MOVIE_LIST, {
      params: { ...requestDefaultParams, ...REQUEST_PARAMS },
    })
    .then(({ data }) => data);

export const usePopularMovieList = () =>
  useQuery<MovieListResultsResponse, ResponseError>({
    queryKey: [POPULAR_MOVIE_LIST_QUERY_KEY],
    queryFn: getPopularMovieList,
  });
