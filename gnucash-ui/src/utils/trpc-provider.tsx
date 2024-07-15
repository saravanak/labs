'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getFetch, loggerLink, httpLink } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';
import { trpc } from './trpc';
import queryClient from './query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { baseUrl } from './base-url';

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const url = `${baseUrl}/api/trpc/`;

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => false,
        }),
        httpLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();

            return fetch(input, {
              ...init,
              credentials: 'include',
            });
          },
        }),
      ],
      transformer: superjson,
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
