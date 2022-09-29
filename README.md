<img src=".github/assets/banner.svg" />
Simple, no dependency JavaScript/TypeScript logger.

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

const Log = new Logger<string>(loglevel, format, reveivers)

Log.DEBUG('this is a debug message') // (Thu, 01 Jan 1970 00:00:00 GMT) [DEBUG] - this is a debug message
Log.INFO('this is an info message') // (Thu, 01 Jan 1970 00:00:00 GMT) [INFO] - this is an info message
Log.WARN('this is a warning message') // (Thu, 01 Jan 1970 00:00:00 GMT) [WARN] - this is a warning message
Log.ERROR('this is an error message') // (Thu, 01 Jan 1970 00:00:00 GMT) [ERROR] - this is an error message
Log.FATAL('this is a fatal message') // (Thu, 01 Jan 1970 00:00:00 GMT) [FATAL] - this is a fatal message

Log.d('this is a debug message') // (Thu, 01 Jan 1970 00:00:00 GMT) [DEBUG] - this is a debug message
Log.i('this is an info message') // (Thu, 01 Jan 1970 00:00:00 GMT) [INFO] - this is an info message
Log.w('this is a warning message') // (Thu, 01 Jan 1970 00:00:00 GMT) [WARN] - this is a warning message
Log.e('this is an error message') // (Thu, 01 Jan 1970 00:00:00 GMT) [ERROR] - this is an error message
Log.f('this is a fatal message') // (Thu, 01 Jan 1970 00:00:00 GMT) [FATAL] - this is a fatal message
```
