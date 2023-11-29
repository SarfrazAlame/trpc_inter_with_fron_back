import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
 
const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
            async headers() {
                return {
                    Authorization: "Bearer 123"
                }
            }
        }),
    ],
});
 
async function signUp() {
    const response = await trpc.createTodo.mutate({
        title: "Machine learning course",
    })
    console.log(response)
}
signUp()