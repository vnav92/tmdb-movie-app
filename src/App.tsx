import { useIntl } from 'react-intl';
import './App.css';
import { MainProvider } from './contexts';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => (
  <MainProvider>
    <Routes>
      <Route path="/" element={<>home</>} />
      <Route path="/movie-list">
        <Route index element={<Navigate to="/" replace />} />
        <Route path=":id/details" element={<>details</>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </MainProvider>
);
