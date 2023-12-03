import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000",
        })
    ]
})

async function main(){
    const user = await trpc.user.signUp.mutate({
        username:"Sarfraz Khan",
        password:"sar@123"
    })
    console.log(user)
}
main()