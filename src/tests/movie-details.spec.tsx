import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import translations from '../intl/en_US.json';
import { getImageSrc } from '../shared';
import { MOVIE_DETAILS_FIXURE } from './fixtures';
import { MovieDetails } from '../modules/movie-details';
import { MainProvider } from '../contexts';

import * as movieDetailsApi from '../api/use-movie-details.api';

describe('MovieDetails', () => {
  it('should render', () => {
    vi.spyOn(movieDetailsApi, 'useMovieDetails').mockReturnValue({
      data: MOVIE_DETAILS_FIXURE,
    } as ReturnType<typeof movieDetailsApi.useMovieDetails>);

    render(
      <MainProvider>
        <MovieDetails />
      </MainProvider>,
    );

    expect(
      screen.getByText(translations['global.appName']),
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      getImageSrc(MOVIE_DETAILS_FIXURE.poster_path),
    )
    expect(screen.getByText(MOVIE_DETAILS_FIXURE.title)).toBeInTheDocument();
    expect(
      screen.getByText(MOVIE_DETAILS_FIXURE.genres[0].name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(MOVIE_DETAILS_FIXURE.release_date),
    ).toBeInTheDocument();
    expect(
      screen.getByText(MOVIE_DETAILS_FIXURE.spoken_languages[0].english_name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(MOVIE_DETAILS_FIXURE.vote_average.toFixed(1)),
    ).toBeInTheDocument();
    expect(screen.getByText(MOVIE_DETAILS_FIXURE.overview)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: translations['movieDetails.backToListLink']})).toHaveAttribute('href', '/')
  });

  it('should render loading state', () => {
    vi.spyOn(movieDetailsApi, 'useMovieDetails').mockReturnValue({
      data: {},
      isLoading: true
    } as unknown as ReturnType<typeof movieDetailsApi.useMovieDetails>);

    render(
      <MainProvider>
        <MovieDetails />
      </MainProvider>,
    );

        expect(
      screen.getByLabelText(translations['global.loading']),
    ).toBeInTheDocument();
        })

    it('should redner error', () => {
      const MOCK_ERROR = 'mock-error';

          vi.spyOn(movieDetailsApi, 'useMovieDetails').mockReturnValue({
            data: [],
            error: {
              response: {
                data: {
                  status_message: MOCK_ERROR,
                },
              },
            },
          } as unknown as ReturnType<typeof movieDetailsApi.useMovieDetails>);

              render(
      <MainProvider>
        <MovieDetails />
      </MainProvider>,
    );


          expect(screen.getByText(MOCK_ERROR)).toBeInTheDocument();
  })
})
