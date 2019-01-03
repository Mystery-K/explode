import logger from '../common/logger';

async function chat(ctx) {
  logger.info(JSON.stringify(ctx.query));
  const text = (ctx.query.text || '')
    .replace(/[吗]/g, '')
    .replace(/[我]/g, '你')
    .replace(/[你]/g, '你才')
    .replace(/[?？]/g, '！');
  ctx.body = {
    message: 'success',
    data: text,
  };
}

export { chat };
