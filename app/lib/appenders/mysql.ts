import { LoggingEvent } from 'log4js';
import Log from '../../models/Log';

function configure() {
  const types: string[] = [
    'info',
    'warn',
    'error',
    'fatal',
  ];
  return async (loggingEvent: LoggingEvent) => {
    const log: Log = new Log();
    if (loggingEvent && loggingEvent.data && loggingEvent.data[0]) {
      if (loggingEvent.data[0] instanceof Error) {
        log.set({
          name: loggingEvent.data[0].name,
          message: loggingEvent.data[0].message,
          stack: loggingEvent.data[0].stack,
          type: types.indexOf(loggingEvent.level.levelStr.toLowerCase()),
          time: loggingEvent.startTime.getTime(),
        });
        await log.save();
      } else if (typeof loggingEvent.data[0] === 'string') {
        log.set({
          name: 'Message',
          message: loggingEvent.data[0],
          type: types.indexOf(loggingEvent.level.levelStr.toLowerCase()),
          time: loggingEvent.startTime.getTime(),
        });
        await log.save();
      }
    }
  };
}

exports.configure = configure;
