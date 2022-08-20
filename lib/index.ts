type ReceiverFn = (log: string) => void | Promise<void>;

type Receivers = Readonly<Record<LogLevel, ReceiverFn>>;

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

type Format<D> = (level: LogLevel, data: D) => string;

const DEFAULT_LOGLEVEL: LogLevel = LogLevel.DEBUG;
const DEFAULT_FORMAT = <D>(level: LogLevel, data: D) => `(${new Date().toUTCString()}) [${LogLevel[level]}] - ${data}`;
const DEFAULT_RECEIVERS: Receivers = {
  [LogLevel.DEBUG]: console.log,
  [LogLevel.INFO]: console.log,
  [LogLevel.WARN]: console.warn,
  [LogLevel.ERROR]: console.error,
  [LogLevel.FATAL]: console.error,
};

/**
 * @class Logger
 */
export class Logger<D = string> {
  /**
   * Create a new Logger.
   *
   * @param loglevel The minimum loglevel for sending out.
   * @param format Method for transforming the log data into the final string.
   * @param receivers Object as a map of where to send logs to.
   * @default
   * loglevel DEFAULT_LOGLEVEL
   * format DEFAULT_FORMAT
   * receivers DEFAULT_RECEIVERS
   * @see ReceiverFn
   * @see Receivers
   * @see LogLevel
   * @see Format
   * @example
   * const numberLogger = new Logger<number>(LogLevel.INFO)
   * numberLogger.DEBUG(1) // no output
   * numberLogger.INFO(2) // output: (*current UTC time*) [INFO] - 2
   */
  constructor(
    private readonly loglevel: LogLevel = DEFAULT_LOGLEVEL,
    private readonly format: Format<D> = DEFAULT_FORMAT,
    private readonly receivers: Receivers = DEFAULT_RECEIVERS,
  ) {}

  private log = async (level: LogLevel, data: D): Promise<void> =>
    void (level >= this.loglevel && (await this.receivers[level](this.format(level, data))));

  DEBUG = (data: D) => this.log(LogLevel.DEBUG, data);
  INFO = (data: D) => this.log(LogLevel.INFO, data);
  WARN = (data: D) => this.log(LogLevel.WARN, data);
  ERROR = (data: D) => this.log(LogLevel.ERROR, data);
  FATAL = (data: D) => this.log(LogLevel.FATAL, data);
}
