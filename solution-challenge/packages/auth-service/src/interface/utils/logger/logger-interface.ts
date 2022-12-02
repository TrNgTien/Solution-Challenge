import { HttpRequest, HttpResponse } from "../../low-level/type";

export interface ILoggerFactory {
    // logDB(): ILogger
    logError(): ILogger
    logResponse(): ILogger
    logRequest(): ILogger
}

export interface ILogger {
    log(req: HttpRequest, res: HttpResponse): void
}

export interface ILoggerAtributes {
    type: string;
    format: string;
    timestamp: string;
    triggerBy: any;
}

// export interface IWriter {
//     write(req: any, res: any, next: any): string
// }

// export interface IWriterFactory {
//     create(writerName: string, req: any, res: any, next: any)
// }


