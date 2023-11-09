import express from 'express'
import cors from 'cors'
import { initTRPC } from '@trpc/server'

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))


const t = initTRPC.create()

t.router({
    sayHI: t.procedure.query(() => {
        return 'HIii Sarfraz '
    }),
    logToServer: t.procedure.input(v => {
        if (typeof v === 'string') return v

        throw new Error("Invalid Input")
    }).mutation(req => {
        console.log(`Client Says : ${req.input}`)
    })

})

app.listen(3000)