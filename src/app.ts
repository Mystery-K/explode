import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './rootRouter';
import logger from './common/logger';
import logMiddleware from './middlewares/logMiddleware';

const app = new Koa();

app.use(logMiddleware);

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(9408, () => {
  logger.info('Node server start at 9408');
});
