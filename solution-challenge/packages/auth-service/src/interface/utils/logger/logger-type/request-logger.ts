import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import { HttpRequest, HttpResponse } from '../../../low-level/type'
import { ILogger } from '../logger-interface'

export class RequestLogger implements ILogger {
    
    public log(req: HttpRequest, res: HttpResponse): void {
        
        let forWriteString: string
        let ip: string | string[] = req.headers['x-forwarded-for'] 

        req.on('data', () => {

            let date: string = new Date().toString()
            forWriteString = `${date} ${res.statusCode} ${req.method} ${req.originalUrl} ${req.params} ${req.query} ${ip} ${req.body} \n`
            
        })

        let fileName: string = new Date().toLocaleDateString().replace(/\//g, "-") + ".log"
        let dirName: string = process.cwd() + "/logger/request"

        fs.appendFileSync(`${dirName}/${fileName}`, forWriteString)

    }
}
