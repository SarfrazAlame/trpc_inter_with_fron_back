import { publicProcedure, router } from "./trpc";
import { z } from 'zod'
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
    signUp: publicProcedure
        .input(z.object({
            email: z.string(),
            password: z.string()
        }))
        .mutation(async (opts) => {

            // context
            const username = opts.ctx.username
            console.log(username)

            let email = opts.input.email
            let password = opts.input.password

            // Do Validation here
            // Do DataBase Stuff here

            let token = "123123"
            return {
                token
            }
        }),
    createTodo:publicProcedure
        .input(z.object({
            title:z.string()
        }))
        .mutation(async(opts)=>{
            console.log(opts.ctx.username)
            return {
                id:"1",
            }
        })
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"];
        console.log(authHeader)
        // jwt.verify
        return {
            username: "sarfraz123"
        }
    }
});

server.listen(3000);
