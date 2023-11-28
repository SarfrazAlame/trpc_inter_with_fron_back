import { publicProcedure, router } from "./trpc";
import { z } from 'zod'
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
    createTodo: publicProcedure
        .input(z.object({
            title: z.string(),
            description: z.string()
        }))
        .mutation(async (opts) => {
            const titile = opts.input.title
            const description = opts.input.description
            // db stuff here

            return {
                id: "1",
            }
        })
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000);
