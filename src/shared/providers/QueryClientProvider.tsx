import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isDev } from '@constants/env';
import ms from 'ms';

const Provider = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: ms('3s'),
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      {isDev === true ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  );
};

export default Provider;
