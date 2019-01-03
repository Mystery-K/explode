import KoaRouter from 'koa-router';
import indexRouter from './routes';

const router = new KoaRouter();

router.use('', indexRouter.routes());

export default router;
