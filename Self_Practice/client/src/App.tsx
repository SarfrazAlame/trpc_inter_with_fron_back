import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './utils/trpc';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: `Bearer ${localStorage.getItem("token")}` || "",
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Signup />
      </QueryClientProvider>
    </trpc.Provider>
  );
}


function Signup() {
  const userData = trpc.user.me.useQuery()
  return <>
    <div>
      <h1>{userData.data?.username}</h1>
    </div>
  </>
}
