"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const t = server_1.initTRPC.context().create();
exports.router = t.router;
exports.publicProcedure = t.procedure;
exports.middleware = t.middleware;
