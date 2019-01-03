import KoaRouter from 'koa-router';
import { chat } from '../controllers/chat';

const router = new KoaRouter();

router.get('/chat', chat);

export default router;
