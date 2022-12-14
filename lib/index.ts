type ReceiverFn<L> = (log: L) => void | Promise<void>;

export type Receivers<L> = Readonly<Record<LogLevel, ReceiverFn<L>>>;

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

export type Format<D, O> = (level: LogLevel, data: D) => O;

const DEFAULT_LOGLEVEL: LogLevel = LogLevel.DEBUG;
const DEFAULT_FORMAT = (level: LogLevel, data: string) =>
  `(${new Date().toUTCString()}) [${LogLevel[level]}] - ${data}`;
const DEFAULT_RECEIVERS: Receivers<string> = {
  [LogLevel.DEBUG]: console.log,
  [LogLevel.INFO]: console.log,
  [LogLevel.WARN]: console.warn,
  [LogLevel.ERROR]: console.error,
  [LogLevel.FATAL]: console.error,
};

/**
 * @class Logger
 */
export class Logger<Args = string, Out = string> {
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
    private readonly format: Format<Args, Out> = DEFAULT_FORMAT as unknown as Format<Args, Out>,
    private readonly receivers: Receivers<Out> = DEFAULT_RECEIVERS as unknown as Receivers<Out>,
  ) {}

  log = (level: LogLevel, data: Args) =>
    void (level >= this.loglevel && this.receivers[level]?.(this.format(level, data)));

  DEBUG = (data: Args) => this.log(LogLevel.DEBUG, data);
  INFO = (data: Args) => this.log(LogLevel.INFO, data);
  WARN = (data: Args) => this.log(LogLevel.WARN, data);
  ERROR = (data: Args) => this.log(LogLevel.ERROR, data);
  FATAL = (data: Args) => this.log(LogLevel.FATAL, data);

  d = (data: Args) => this.log(LogLevel.DEBUG, data);
  i = (data: Args) => this.log(LogLevel.INFO, data);
  w = (data: Args) => this.log(LogLevel.WARN, data);
  e = (data: Args) => this.log(LogLevel.ERROR, data);
  f = (data: Args) => this.log(LogLevel.FATAL, data);
}
