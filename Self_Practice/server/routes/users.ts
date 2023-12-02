import { publicProcedure, router } from "../trpc";
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { SECRET } from "..";


export const userRouter = router({
    signUp: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.number()
        }))
        .mutation(async (opts) => {
            const username = opts.input.username
            const password = opts.input.password
            const response = await opts.ctx.db.User.insertMany([{
                username,
                password
            }])
            let userId = response[0]._id
            const token = jwt.sign({ userId: userId }, SECRET, { expiresIn: '7d' })

            return {
                token
            }
        })
})