import { MainProvider } from './contexts';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MovieList } from './modules/movie-list';
import { MovieDetails } from './modules/movie-details';

export const App: React.FC = () => (
  <MainProvider>
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie-list">
        <Route index element={<Navigate to="/" replace />} />
        <Route path=":id/details" element={<MovieDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </MainProvider>
);
