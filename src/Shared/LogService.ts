import store from "../Store";

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

const logServiceMap = new Map<string, LogService>();
let logEntryBuffer: string[] = [];

export class LogService {
  private readonly context: string;
  private readonly levelConsole: number;
  private readonly levelPersist: number;

  constructor(context: string) {
    const state = store.getState();
    this.context = context;
    this.levelConsole = state.config.logLevelConsole;
    this.levelPersist = state.config.logLevelPersist;
  }

  static get = (context: string): LogService => {
    const service = logServiceMap.get(context);
    if (service) {
      return service;
    }

    const newService = new LogService(context);
    logServiceMap.set(context, newService);
    return newService;
  };

  static flushBuffer = (): void => {
    // TODO create and connect application log service for client side logging.
    logEntryBuffer = [];
  };

  debug = (object: string | Error | Record<string, unknown>): void => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.DEBUG) {
      console.debug(contextMessage);
    }

    if (this.levelPersist <= LogLevel.DEBUG) {
      this.logToBuffer(contextMessage, LogLevel.DEBUG);
    }
  };

  info = (object: string | Error | Record<string, unknown>): void => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.INFO) {
      console.info(contextMessage);
    }

    if (this.levelPersist <= LogLevel.INFO) {
      this.logToBuffer(contextMessage, LogLevel.INFO);
    }
  };

  warn = (object: string | Error | Record<string, unknown>): void => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.WARN) {
      console.warn(contextMessage);
    }

    if (this.levelPersist <= LogLevel.WARN) {
      this.logToBuffer(contextMessage, LogLevel.WARN);
    }
  };

  error = (object: string | Error | Record<string, unknown>): void => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.ERROR) {
      console.error(contextMessage);
    }

    if (this.levelPersist <= LogLevel.ERROR) {
      this.logToBuffer(contextMessage, LogLevel.ERROR);
    }
  };

  getContextMessage = (
    object: string | Error | Record<string, unknown>
  ): string => {
    let output;
    if (object instanceof Error) {
      output = object.stack;
    } else if (typeof object === "string") {
      output = object;
    } else {
      output = JSON.stringify(object);
    }

    return `${this.context} - ${output}`;
  };

  logToBuffer = (message: string, level: LogLevel): void => {
    const dateString = new Date().toUTCString();
    logEntryBuffer.push(`${dateString}: ${level} - ${message}`);
  };
}
