import { publicProcedure, router } from "../trpc";
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { SECRET } from "..";
import { TRPCError } from "@trpc/server"
import { isLoggedIn } from "../middleware";


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
                id: "1"
            }
        }),
    login: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.string()
        }))
        .mutation(async (opts) => {
            const response = await opts.ctx.db.User.find({
                username: opts.input.username
            })
            if (!response) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const token = await jwt.sign({ userId: opts.ctx.userId }, SECRET, { expiresIn: "1h" })

            return {
                token
            }
        }),
    me:publicProcedure
        .use(isLoggedIn)
        .output(z.object({
            username:z.string()
        }))
        .query(async(opts)=>{
            const response = await opts.ctx.db.User.findById(opts.ctx.userId)
            if(!response){
                throw new TRPCError({code :"UNAUTHORIZED"})
            }
            return  {
                username: response.username || ""
            }
        })
})