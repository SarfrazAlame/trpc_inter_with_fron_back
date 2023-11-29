import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
});

// async function main(){
//     const response = await trpc.createTodo.mutate({
//         title:"learn ml",
//         description:"amazing course taught by David Malan",
//     })
//     console.log(response)
// }

// main()
async function signUp() {
    const response = await trpc.signUp.mutate({
        email: "sarfraz@gmail.com",
        password: "1234"
    })
    console.log(response)
}
signUp()