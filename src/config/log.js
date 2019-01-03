import { isProduction } from '../utils';

const config = {
  dev: {
    level: 'debug',
    logFile: './explode.log',
  },
  prod: {
    level: 'info',
    logFile: './explode.log',
  },
};

export default (isProduction() ? config.prod : config.dev);
