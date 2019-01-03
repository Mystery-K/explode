import logger from '../common/logger';

export default async function logMiddleware(ctx, next) {
  logger.info(ctx.request.url);
  await next();
}
