<img src=".github/assets/banner.svg" />
Simple JavaScript/TypeScript logger.

## Usage

### Install
```bash
npm install @allwqre/js-logger
```
or
```bash
yarn add @allwqre/js-logger
```

### Use
```TS
import { Logger, LogLevel } from '@allwqre/js-logger'

// minimum log level
const loglevel: LogLevel = LogLevel.DEBUG;

// log message formatting
const format = (level: LogLevel, data: string) => `(${new Date().toUTCString()}) [${LogLevel[level]}] - ${data}`;

// log message receivers
const receivers = {
  [LogLevel.DEBUG]: console.log,
  [LogLevel.INFO]: console.log,
  [LogLevel.WARN]: console.warn,
  [LogLevel.ERROR]: console.error,
  [LogLevel.FATAL]: console.error,
};

const SomeLogger = new Logger<string>(loglevel, format, reveivers)

SomeLogger.DEBUG('this is a debug message') // (Thu, 01 Jan 1970 00:00:00 GMT) [DEBUG] - this is a debug message
SomeLogger.INFO('this is an info message') // (Thu, 01 Jan 1970 00:00:00 GMT) [INFO] - this is an info message
SomeLogger.WARN('this is a warning message') // (Thu, 01 Jan 1970 00:00:00 GMT) [WARN] - this is a warning message
SomeLogger.ERROR('this is an error message') // (Thu, 01 Jan 1970 00:00:00 GMT) [ERROR] - this is an error message
SomeLogger.FATAL('this is a fatal message') // (Thu, 01 Jan 1970 00:00:00 GMT) [FATAL] - this is a fatal message
```
