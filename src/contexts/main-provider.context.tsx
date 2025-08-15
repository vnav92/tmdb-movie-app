import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';

import messages from '../intl/en_US.json';
import { BrowserRouter } from 'react-router-dom';

const DEFAULT_LOCALE = 'en';

type MainProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={DEFAULT_LOCALE} messages={messages}>
        <BrowserRouter>{children}</BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  );
};
