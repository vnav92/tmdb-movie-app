import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MovieList } from '../modules/movie-list';
import { MOVIE_LIST_FIXTURE } from './fixtures';
import { MainProvider } from '../contexts';
import translations from '../intl/en_US.json';
import { getImageSrc } from '../shared';

import * as movieListApi from '../api/use-movie-list.api';

describe('MovieList', () => {
  it('should render', () => {
    vi.spyOn(movieListApi, 'useMovieList').mockReturnValue({
      data: {
        results: MOVIE_LIST_FIXTURE,
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    } as ReturnType<typeof movieListApi.useMovieList>);

    render(
      <MainProvider>
        <MovieList />
      </MainProvider>,
    );

    expect(
      screen.getByText(translations['global.appName']),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(translations['textInput.placeholder']),
    ).toBeInTheDocument();
    expect(
      screen.getByText(translations['movieList.sectionHeader.popularMovies']),
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      getImageSrc(MOVIE_LIST_FIXTURE[0].backdrop_path),
    );
    expect(screen.getByText(MOVIE_LIST_FIXTURE[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(MOVIE_LIST_FIXTURE[0].release_date),
    ).toBeInTheDocument();
    expect(
      screen.getByText(MOVIE_LIST_FIXTURE[0].vote_average.toFixed(1)),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: translations['movieListItem.seeDetailsButton'],
      }),
    ).toHaveAttribute(
      'href',
      `/movie-list/${MOVIE_LIST_FIXTURE[0].id}/details`,
    );
  });

  it('should search movie', async () => {
    vi.spyOn(movieListApi, 'useMovieList').mockReturnValue({
      data: {
        results: MOVIE_LIST_FIXTURE,
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    } as ReturnType<typeof movieListApi.useMovieList>);

    render(
      <MainProvider>
        <MovieList />
      </MainProvider>,
    );

    await userEvent.type(screen.getByRole('textbox'), 'test');

    expect(
      screen.getByText(translations['movieList.sectionHeader.searchResults']),
    ).toBeInTheDocument();
    expect(screen.getByText(MOVIE_LIST_FIXTURE[0].title)).toBeInTheDocument();
  });

  it('should render loading state', () => {
    vi.spyOn(movieListApi, 'useMovieList').mockReturnValue({
      data: [],
      isLoading: true,
    } as unknown as ReturnType<typeof movieListApi.useMovieList>);

    render(
      <MainProvider>
        <MovieList />
      </MainProvider>,
    );

    expect(
      screen.getByLabelText(translations['global.loading']),
    ).toBeInTheDocument();
  });

  it('should redner error', () => {
    const MOCK_ERROR = 'mock-error';

    vi.spyOn(movieListApi, 'useMovieList').mockReturnValue({
      data: [],
      error: {
        response: {
          data: {
            status_message: MOCK_ERROR,
          },
        },
      },
    } as unknown as ReturnType<typeof movieListApi.useMovieList>);

    render(
      <MainProvider>
        <MovieList />
      </MainProvider>,
    );

    expect(screen.getByText(MOCK_ERROR)).toBeInTheDocument();
  });
});
