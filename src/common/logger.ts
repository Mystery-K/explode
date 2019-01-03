import path from 'path';
import winston, { Logger, transports } from 'winston';
import chalk from 'chalk';
import { format } from 'date-fns';
import logConfig from '../config/log';
import { isProduction } from '../utils';

const { printf } = winston.format;

enum levels {
  error = 'error',
  warn = 'warn',
  info = 'info',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
}

interface LogMethods {
  error: () => void;
  warn: () => void;
  info: () => void;
  verbose: () => void;
  debug: () => void;
  silly: () => void;
}

interface Config {
  level: levels | string;
  logFile: string;
}

class Log implements LogMethods {
  private logger: Logger | null = null;
  constructor(config: Config, isProduction: boolean = false) {
    this.logger = winston.createLogger({
      level: config.level,
      format: printf(info => {
        let time = format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS');
        let level = info.level;
        let msg: any = info.message;
        let levelChalk;

        if (Object.prototype.toString.call(msg) === '[object Array]') {
          if (msg[0] instanceof Error && msg.length === 1) {
            level = levels.error;
            msg = [msg[0].message, msg[0].stack!].join('\n');
          } else {
            msg = msg.join(' ');
          }
        }

        switch (level) {
          case levels.error:
            levelChalk = chalk.red;
            break;
          case levels.warn:
            levelChalk = chalk.yellow;
            break;
          default:
            levelChalk = chalk.green;
        }

        time = isProduction ? time : chalk.blue(time);
        level = isProduction ? level : levelChalk(level);

        return `${time}[${level}] ${msg}`;
      }),
      transports: [new winston.transports.Console(), new winston.transports.File({ filename: config.logFile })],
      exceptionHandlers: [new winston.transports.Console(), new transports.File({ filename: 'exceptions.log' })],
    });
  }

  setLevel(level: levels | string): void {
    this.logger!.level = level;
  }

  setLogFile(fullpath: string): void {
    this.logger!.configure({
      transports: [new winston.transports.File({ filename: path.resolve(fullpath) })],
    });
  }

  error(...args: any[]) {
    this.logger!.error({
      message: args,
    });
  }
  warn(...args: any[]) {
    this.logger!.warn({
      message: args,
    });
  }
  info(...args: any[]) {
    this.logger!.info({
      message: args,
    });
  }
  verbose(...args: any[]) {
    this.logger!.verbose({
      message: args,
    });
  }
  debug(...args: any[]) {
    this.logger!.debug({
      message: args,
    });
  }
  silly(...args: any[]) {
    this.logger!.silly({
      message: args,
    });
  }
}

export default new Log(logConfig, isProduction());
