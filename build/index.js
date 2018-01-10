"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Save your local vars in .env for testing. DO NOT VERSION CONTROL `.env`!.
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    require('dotenv').config();
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const chalk = require("chalk");
const routes_1 = require("./routes");
const app = new Koa();
const port = process.env.PORT || 5555;
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const start = Date.now();
    yield next();
    const ms = Date.now() - start;
    console.log(`request: ${ctx.method} ${ctx.url} - ${ms}`);
}));
app.use(bodyParser())
    .use(routes_1.default.routes())
    .use(routes_1.default.allowedMethods());
app.listen(port, () => console.log(chalk.default.bgGreen.black.dim(` Listening on port: ${port} `)));
exports.default = app;
//# sourceMappingURL=index.js.map