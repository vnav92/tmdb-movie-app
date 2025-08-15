import { useQuery } from '@tanstack/react-query';

import {
  api,
  ApiPath,
  requestDefaultParams,
  type MovieDetailsResponse,
  type ResponseError,
} from '../shared';

const MOVIE_DETAILS_QUERY_KEY = 'movie-details-query';

const getMovieDetails = async (movieId: string) => {
  const { data } = await api.get<MovieDetailsResponse>(
    `${ApiPath.MOVIE_DETAILS}/${movieId}`,
    {
      params: requestDefaultParams,
    },
  );

  return data;
};

export const useMovieDetails = (movieId?: string) =>
  useQuery<MovieDetailsResponse, ResponseError>({
    queryKey: [MOVIE_DETAILS_QUERY_KEY],
    queryFn: () => getMovieDetails(movieId || ''),
    enabled: !!movieId,
  });
