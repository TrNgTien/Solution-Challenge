import fs from 'fs'
import { HttpRequest, HttpResponse } from '../../../low-level/type'
import { ILogger } from '../logger-interface'

export class ErrorLogger implements ILogger {

    public log(req: HttpRequest, res: HttpResponse): void {

        let ip: string | string[] = req.headers['x-forwarded-for'] || req.connection.localAddress
        let date: string = new Date().toString()
        let fileName: string = new Date().toLocaleDateString().replace(/\//g, "-") + ".log"
        let dirName: string = process.cwd() + "/log/error"

        if (!fs.existsSync(dirName)) { fs.mkdirSync(dirName) }

        var forWriteString: string = `${date} ${res.statusCode} ${req.method} ${req.originalUrl} ${req.params} ${req.query} ${ip} ${req.body} \n`

        fs.appendFileSync(`${dirName}/${fileName}`, forWriteString)
    }
}
