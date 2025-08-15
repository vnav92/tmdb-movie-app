import { usePopularMovieList } from '../../api';

export const MovieList: React.FC = () => {
  const { data } = usePopularMovieList();

  console.log(data);
  return <>movie list</>;
};
