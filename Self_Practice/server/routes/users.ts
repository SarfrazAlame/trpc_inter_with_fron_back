import { publicProcedure, router } from "../trpc";
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { SECRET } from "..";


export const userRouter = router({
    signUp: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.string()
        }))
        .mutation(async (opts) => {
            console.log("hiii sarfraz")
            const username = opts.input.username
            const password = opts.input.password
            const response = await opts.ctx.db.User.insertMany([{
                username,
                password
            }])
            let userId = response[0]._id
            const token: string = jwt.sign({ userId: userId }, SECRET, { expiresIn: '1h' })

            return {
                token,
                id :"1"
            }
        })
})