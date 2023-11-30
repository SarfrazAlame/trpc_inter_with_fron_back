"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@trpc/server");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
const t = server_1.initTRPC.create();
t.router({
    sayHI: t.procedure.query(() => {
        return 'HIii Sarfraz ';
    }),
    logToServer: t.procedure.input(v => {
        if (typeof v === 'string')
            return v;
        throw new Error("Invalid Input");
    }).mutation(req => {
        console.log(`Client Says : ${req.input}`);
    })
});
app.listen(3000);
