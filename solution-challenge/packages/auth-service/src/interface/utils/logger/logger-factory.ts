import { ILogger, ILoggerFactory } from "./logger-interface";
import { ErrorLogger } from "./logger-type/error-logger";
import { RequestLogger } from "./logger-type/request-logger";
import { ResponseLogger } from "./logger-type/response-logger";

export default class LoggersFactory implements ILoggerFactory{
    
    logRequest(): ILogger {
        return new RequestLogger()
    }

    logResponse(): ILogger {
        return new ResponseLogger()
    }

    logError(): ILogger {
        return new ErrorLogger()
    }
}