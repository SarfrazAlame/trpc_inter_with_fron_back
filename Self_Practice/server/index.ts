import { publicProcedure, router } from "./trpc";
import { z } from 'zod'
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
    SignUp: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.number()
        }))
        .query(async (opts) => {
            console.log("hii sarfraz")
            const username = opts.input.username
            const password = opts.input.password

            return {
                id: "q"
            }
        })
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000);