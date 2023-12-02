import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import mongoose from "mongoose";
import cors from 'cors'
import { Todo, User } from "./db";
import jwt from 'jsonwebtoken'
import { userRouter } from "./routes/users";
export const SECRET = 'srect123'

mongoose.connect("mongodb://127.0.0.1/Trpc")

const appRouter = router({
    user: userRouter
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"]

        if (authHeader) {
            const token = authHeader.split(" ")[1]
            console.log(token)
            return new Promise<{
                db: { Todo: typeof Todo; User: typeof User };
                userId?: string;
            }>((resolve) => {
                jwt.verify(token, SECRET, (err, user) => {
                    if (user) {
                        resolve({ userId: user.userId as string, db: { Todo, User } });
                    } else {
                        resolve({ db: { Todo, User } })
                    }
                })
            })
        }

        return {
            db: { Todo, User }
        }
    }
});

server.listen(3000);