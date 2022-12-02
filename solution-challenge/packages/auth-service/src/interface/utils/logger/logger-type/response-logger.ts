import fs from 'fs'
import { HttpRequest, HttpResponse } from '../../../low-level/type'
import { ILogger } from '../logger-interface'

export class ResponseLogger implements ILogger {
    
    public log(req: HttpRequest, res: HttpResponse): void {
        
        let forWriteString: string
        let ip: string | string[] = req.headers['x-forwarded-for'] || req.connection.remoteAddress

        res.on('finish', () => {

            let date: string = new Date().toString()
            forWriteString = `${date} ${res.statusCode} ${req.method} ${req.originalUrl} ${req.params} ${req.query} ${ip} ${req.body} \n`
        
        })

        let fileName: string = new Date().toLocaleDateString().replace(/\//g, "-") + ".log"
        let dirName: string = process.cwd() + "/logger/response"

        fs.appendFileSync(`${dirName}/${fileName}`, forWriteString)

    }
}