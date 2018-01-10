// Save your local vars in .env for testing. DO NOT VERSION CONTROL `.env`!.
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').config();

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as chalk from 'chalk';
const graphqlHTTP = require('koa-graphql');
import { graphql, buildSchema } from 'graphql';
import schema from './schema'

import router from './routes';

const app = new Koa();
const port = process.env.PORT || 5555;

router.all('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`request: ${ctx.method} ${ctx.url} - ${ms}`);
});
app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods());

app.listen(port, () => console.log(chalk.default.bgGreen.black.dim(` Listening on port: ${port} `)));

export default app;