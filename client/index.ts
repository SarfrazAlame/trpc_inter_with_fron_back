import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { User } from '../server/db';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers() {
        return {
          Authorization: "Bearer 1"
        }
      },
    }),
  ],
});

async function main() {
  const user = await trpc.user.signup.mutate({
    username: "sarfraz@gmail.com",
    password: "!12345"
  });
  console.log(user)
}

main();
